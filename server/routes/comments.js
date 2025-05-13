import express from 'express';
import db from '../db.js';
const commentRouter=express.Router();
commentRouter.get('/:movieId',async (req,res)=>{
    const movieId=req.params.movieId;
    if(!movieId) return res.status(401).json({message:'Unauthorized'});
    try{
        const result=await db.query(
            'SELECT c.*,u.id AS user_id,u.name AS user_email FROM comments c JOIN users u ON c.user_id=u.id WHERE c.movie_id=$1 ORDER BY c.created_at DESC',[movieId]
        )
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({message:'Error fetching comments'});
    }
})
commentRouter.post('/',async (req,res)=>{
    const {userId,movieId,comment}=req.body;
    if(!userId || !movieId || !comment) return res.status(400).json({message:'Missing required fields'});
    try{
        const result=await db.query(
            'INSERT INTO comments (user_id,movie_id,comment) VALUES ($1,$2,$3) RETURNING *',[userId,movieId,comment] 
        )
        const data=result.rows[0];
        res.status(200).json(data);
    }
    catch(err){
        console.error("Error adding comment:",err);
        res.status(500).json({message:'Error adding comment'});
    }
})
commentRouter.delete('/:commentId',async (req,res)=>{
    const commentId=req.params.commentId;
    if(!commentId) return res.status(401).json({message:'Unauthorized'});
    try{
        const result =await db.query(
            'DELETE FROM comments WHERE id=$1 RETURNING *',[commentId]
        )
        if(result.rowCount===0) return res.status(404).json({message:'Comment not found'});
        res.status(200).json({message:'Comment deleted successfully'});
    }
    catch(err){
        console.error("Error deleting comment:",err);
        res.status(500).json({message:'Error deleting comment'});
    }
})
commentRouter.put('/:commentId',async (req,res)=>{
    const commentId=req.params.commentId;
    const {comment}=req.body;
    if(!commentId || !comment) return res.status(400).json({message:'Missing required fields'});
    try{
        const result=await db.query(
            'UPDATE comments SET comment=$1 WHERE id=$2 RETURNING *',[comment,commentId]
        )
        const data=result.rows[0];
        if(!data) return res.status(404).json({message:'Comment not found'});
        return res.status(200).json(data);
    }
    catch(err){
        console.error("Error updating comment:",err);
        res.status(500).json({message:'Error updating comment'});
    }
})
export default commentRouter;