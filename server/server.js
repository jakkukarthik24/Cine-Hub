import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import initialize from './passport.js';
import frouter from './routes/favorites.js';
import wrouter from './routes/watchlist.js';
import commentRouter from './routes/comments.js';
dotenv.config();
const app = express();
initialize(passport);
app.use(cors({
    origin:'https://cine-hub69.netlify.app',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:1000*60*60*24*7,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth',authRoutes);
app.use('/api/favorites',frouter);
app.use('/api/watchlist',wrouter);
app.use('/api/comments',commentRouter);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})