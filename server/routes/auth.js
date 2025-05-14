import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db.js';

const router = express.Router();
const saltRounds=10;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
        if (result.rows.length === 0) {
            return done(null, false, { message: 'Incorrect email or password' });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser(async (id,done)=>{
    try{
        const result=await db.query('SELECT * FROM users WHERE id=$1',[id]);
        const user = result.rows[0];
        if(user)
            return done(null,result.rows[0]);
        else{
            done(new Error('User not found'));
        }
    }
    catch(err){
        done(err);
    }
})
router.post('/register',async (req,res)=>{
    const {email,password}=req.body;
    const name=email.split('@')[0];
    if(!email || !password){
        return res.status(400).json({message:'Please provide email and password'});
    }
    try{
        const ifExists=await db.query('SELECT * FROM users WHERE email=$1',[email]);
        if(ifExists.rows.length>0){
            res.status(400).json({message:'User already exists'});
        }
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        const result=await db.query(
            'INSERT INTO users (email,password,name) VALUES ($1,$2,$3) RETURNING *',
            [email,hashedPassword,name]
        );
        const user=result.rows[0];
        req.login(user,err =>{
            if(err) return res.status(500).json({message:'Error logging in'})
            const { password, ...safeUser } = user;
            return res.status(201).json({ user: safeUser });
        });
    }
    catch(err){
        res.status(500).json({message:'Registration error'});
    }
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return res.status(500).json({ error: 'Internal server error' });
  
      if (!user) {
        return res.status(401).json({ error: info.message || 'Unauthorized' });
      }
  
      req.login(user, (err) => {
        if (err) return res.status(500).json({ error: 'Login failed' });
        const { password, ...safeUser } = user;
        return res.status(200).json({ user: safeUser });
      });
    })(req, res, next);
  });
  
router.post('/logout',(req,res)=>{
    req.logout(err=>{
        if(err) return res.status(500).json({message:'Error logging out'});
        res.json({message:'Logged out successfully'});
    });
})
export default router;