import '../css/MovieCard.css';
import { useNavigate } from "react-router-dom";
import { useMovieContext } from '../hooks/useMovieContext';

function MovieCard({movie}){
    const {isFavorite,addToFavorites,removeFromFavorites,isWatchListed,addToWatchList,removeFromWatchList}=useMovieContext();
    const favorite=isFavorite(movie.id);
    const watchlisted= isWatchListed(movie.id);
    const navigate=useNavigate();
    function handleFavorite(e){
        e.stopPropagation();
        e.preventDefault();
        if(favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }
    function handleWatchList(e){
        e.stopPropagation();
        e.preventDefault();
        if(watchlisted) removeFromWatchList(movie.id);
        else addToWatchList(movie);
    }
    function handleClick(){
        navigate(`/movie/${movie.id}`,{state:{movie}});
    }
    return <div className="movie-card" onClick={handleClick}>
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`watchlist-btn ${watchlisted ? "active":""}`}  onClick={handleWatchList} title="watchlist">★</button>
                    <button className={`favorite-btn ${favorite?"active":""}`} id='fav' onClick={handleFavorite} title="favorite">♥</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>

            </div>
        </div>
    
}
export default MovieCard