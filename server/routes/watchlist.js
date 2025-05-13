import express from 'express';
import db from '../db.js';
const wrouter=express.Router();
wrouter.post('/add',async (req,res)=>{
    const {userId,movieId,movieTitle,moviePoster,releaseDate}=req.body;
    try{
        if (!userId || !movieId || !movieTitle || !moviePoster || !releaseDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        await db.query(
            'INSERT INTO watchlist (user_id,movie_id,movie_title,movie_poster,release_date) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (user_id, movie_id) DO NOTHING',
            [userId,movieId,movieTitle,moviePoster,releaseDate]
        );
        res.status(200).json({message:'Movie added to watchlist'});
    }
    catch(err){
        console.error("Error adding to watchlist:", err);
        res.status(500).json({message:'Error adding to watchlist'});
        
    }
});
wrouter.post('/remove',async (req,res)=>{
    const {userId,movieId}=req.body;
    try{
        await db.query(
            'DELETE FROM watchlist WHERE user_id=$1 AND movie_id=$2',
            [userId,movieId]
        );
        res.status(200).json({message:"Movie removed from watchlist"});
    }
    catch(err){
        console.error("Error removing movie from watchlist:",err);
        res.status(500).json({message:"Error removing movie from watchlist"});
    }
});
wrouter.get('/:userId',async (req,res)=>{
    const userId = req.params.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    try{
        const result=await db.query(
            'SELECT movie_id AS id,movie_title AS title,movie_poster AS poster_path,release_date FROM watchlist WHERE user_id = $1',[userId]
        )
        const data=result.rows;
        res.json(data);
    }
    catch(err){
        res.status(500).json({message:"Error fetching watchlist"});
    }
})
export default wrouter;