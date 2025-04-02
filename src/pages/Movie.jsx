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
    const [trailerKey,setTrailerKey]=useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movie.id]);
    useEffect(()=>{
        const fetchTrailer=async()=>{
            try{
                const response= await fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
                const data=await response.json();
                const trailer=data.results.find(video=>video.type=="Trailer" && video.site=="YouTube");
                if(trailer){
                    setTrailerKey(trailer.key);
                }
            }
            catch(err){
                console.log("Error finding trailer");
            }
        }
        fetchTrailer()
    },[movie.id]);
    useEffect(()=>{
        const fetchSimilar=async ()=>{
        try{
            
            const response=await fetch(`${BASE_URL}/movie/${movie.id}/similar?api_key=${API_KEY}`);
            const data=await response.json();
            setSimilar(data.results.slice(0,6));
        }
        catch(err){
            console.log("error finding similar movies");
        }
         }
        fetchSimilar();
    },[movie.id]);
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
                <p ><span className="info">Release Date : </span> {movie.release_date}</p>
                <p ><span className="info">Vote Average : </span> {movie.vote_average}</p>
                <br/>
                {trailerKey ? (
                    <div className="trailer-container">
                        <iframe
                        height="320"
                        width="560"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title={`${movie.title} Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    </div>
                )
                :(
                    <p>Trailer Unavailable</p>
                )}
            </div>
        </div>
        <div className="similar">
            <h2>Similar Movies</h2>
            
            <div className="similar-movies">
                    {similar.length > 0 ? (
                        similar.map(movie => <MovieCard movie={movie} key={movie.id} />)
                    ) : (
                        <p>No similar movies found.</p>
                    )}
            </div>
         </div>
        </>
    );
}
export default Movie;