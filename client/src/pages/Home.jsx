import React,{useState,useEffect} from "react";
import '../css/Home.css'
import { useLocation,Link} from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies,getPopularMovies } from "../services/api";

function Home(){
   const location=useLocation();
    const [seacrhQuery,setSearchQuery]=useState("");
     const [movies,setMovies]=useState([]);
   const [error,setError]=useState(null);
   const [loading,setLoading]=useState(true);
     useEffect(()=>{
         if (location.state?.fromSearch && location.state?.searchResults) {
         setSearchQuery(location.state.searchQuery || "");
         setMovies(location.state.searchResults);
         setError(null);
         return;
         }
         const loadPopular= async ()=>{
            try{
               const popular=await getPopularMovies();
               setMovies(popular);
            }
            catch(err){
               console.log(err);
               setError("Failed to retrieve popular");
            }
            finally{
               setLoading(false);
            }
         }
         loadPopular();
     },[location.pathname]);
     const handleSearch = async(e)=>{
        e.preventDefault();
        if(!seacrhQuery.trim()) return;
        if(loading) return;
        setLoading(true);
        try{
         const searchedMovie=await searchMovies(seacrhQuery);
         setMovies(searchedMovie);
         setError(null);
        }catch(err){
         console.log(err);
         setError("Failed to search movie");
        }
        finally{
         setLoading(false);
        }

     };
     function handleSearchQuery(event){
        setSearchQuery(event.target.value);

     }
     return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search for movies " 
                className="search-input" 
                value={seacrhQuery} 
                onChange={handleSearchQuery}/>
                <button type="submit" className="search-btn">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading......</div>:
            (<div className="movies-grid">
                {movies.map(movie=>{
                  const isSearch=seacrhQuery.trim().length>0;
                  const linkState=isSearch?{fromSearch:true,seacrhQuery,searchResults:movies}:null;
                  return(
                     <Link key={movie.id} to={`/movie/${movie.id}`} state={{linkState}}>
                        <MovieCard movie={movie} key={movie.id}></MovieCard>
                    </Link>
                  )
                })}
            </div>)
            }
        </div>
     )
}
export default Home