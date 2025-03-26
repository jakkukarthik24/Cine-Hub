import { useLocation, useNavigate } from "react-router-dom";
import React,{useEffect,useState} from "react";
import "../css/Movie.css";
import MovieCard from "../components/MovieCard.jsx";
import {API_KEY,BASE_URL} from "../services/api.js"
function Movie(){
    const location=useLocation();
    const navigate =useNavigate();
    const movie=location.state?.movie;
    if (!movie) return <div className="error">Movie not found.</div>;
    const [similar,setSimilar]=useState([]);
    useEffect(()=>{
        try{const fetchSimilar=async ()=>{
            const response=await fetch(`${BASE_URL}/movie/${movie.id}/similar?api_key=${API_KEY}`);
            const data=await response.json();
            setSimilar(data.results.slice(0,6));
        }}
        catch(err){
            console.log("error finding similar movies");
        }
    });
    return(
        <>
        <div className="movie-detail">
            <div className="movie-image">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-data">
                <h1>{movie.title}</h1><br></br>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <br/>
                <p>Release Date: {movie.release_date}</p>
                <p>Vote Average: {movie.vote_average}</p>
            </div>
        </div>
        </>
    );
}
export default Movie;