import '../css/MovieCard.css';
import { useNavigate } from "react-router-dom";
import { useMovieContext } from '../contexts/MovieContext';
function MovieCard({movie}){
    const {isFavorite,addToFavorites,removeFromFavorites}=useMovieContext();
    const favorite=isFavorite(movie.id);
    const navigate=useNavigate();
    function handleFavorite(e){
        e.stopPropagation();
        e.preventDefault();
        if(favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }
    function handleClick(){
        navigate(`/movie/${movie.id}`,{state:{movie}});
    }
    return <div className="movie-card" onClick={handleClick}>
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite?"active":""}`} onClick={handleFavorite}>♥</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date.slice(0,4)}</p>
            </div>
        </div>
    
}
export default MovieCard