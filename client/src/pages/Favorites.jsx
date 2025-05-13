import '../css/Favorites.css'
import { useMovieContext } from '../hooks/useMovieContext'
import MovieCard from '../components/MovieCard'
function Favorites(){
    const {favorites}=useMovieContext();
    if(favorites.length!==0){
        return(
            <div className='favorites'>
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                {favorites.map(movie=>
                    (<MovieCard movie={movie} key={movie.id}></MovieCard>))}
                </div>
            </div>
        )
    }
    else return(
        <div className="favorites-empty">
            <h2>Your Favorites</h2>
            <p>There are no current favorites</p>
        </div>
    )
}
export default Favorites