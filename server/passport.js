import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';
import db from './db.js';
export default function initialize(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},async (email,password,done)=>{
        try{
            const result =await db.query('SELECT * FROM users WHERE email=$1',[email]);
            const user=result.rows[0];
            if(!user){
                return done(null,false,{message:'No user with that email'});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(isMatch){
                return done(null,user);
            }
            else return done(null,false,{message:'Password Incorrect'});   
        }
        catch(err){
            return done(err);
        }
    })
    );
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser(async(id,done)=>{
        try{
            const result=await db.query('SELECT * FROM users WHERE id=$1',[id]);
            const user=result.rows[0];
            done(null,user);
        }
        catch(err){
            done(err);
        }
    });
}