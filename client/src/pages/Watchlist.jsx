import '../css/Favorites.css'
import { useMovieContext } from '../hooks/useMovieContext'
import MovieCard from '../components/MovieCard'
function Watchlist(){
    const {watchlist}=useMovieContext();
    const uniqueMovies = [...new Map(watchlist.map(m => [m.id, m])).values()];

    if(watchlist.length!==0){
        return(
            <div className='favorites'>
                <h2>Your Watchlist</h2>
                <div className="movies-grid">
                {uniqueMovies.map(movie=>
                    (<MovieCard movie={movie} key={movie.id}></MovieCard>))}
                </div>
            </div>
        )
    }
    else return(
        <div className="favorites-empty">
            <h2>Your watchlist</h2>
            <p>There are no current watchlist</p>
        </div>
    )
}
export default Watchlist