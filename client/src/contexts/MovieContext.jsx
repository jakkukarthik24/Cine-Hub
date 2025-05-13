import { createContext, useState, useEffect,useContext} from "react";

export const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist,setWatchList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/${user.id}`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (Array.isArray(data)) setFavorites(data);
        else setFavorites([]);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setFavorites([]);
      }
    }
    async function fetchWatchList() {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:5000/api/watchlist/${user.id}`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (Array.isArray(data)) setWatchList(data);
        else setWatchList([]);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setWatchList([]);
      }
    }
    fetchFavorites();
    fetchWatchList();
  }, [user]);

  const addToFavorites = async (movie) => {
    if (!user) return alert("Please log in");
    try {
      await fetch("http://localhost:5000/api/favorites/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          movieId: movie.id,
          movieTitle: movie.title,
          moviePoster: movie.poster_path,
          releaseDate: movie.release_date,
        }),
      });
      setFavorites((prev) => [...prev, movie]);
      
    } catch (err) {
      console.error("Add failed", err);
    }
  };
  const addToWatchList = async (movie) => {
    if (!user) return alert("Please log in");
    try {
      await fetch("http://localhost:5000/api/watchlist/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          movieId: movie.id,
          movieTitle: movie.title,
          moviePoster: movie.poster_path,
          releaseDate: movie.release_date,
        }),
      });
      setWatchList((prev) => [...prev, movie]);
      
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const removeFromFavorites = async (movieId) => {
    if (!user) return alert("Please log in");
    try {
      await fetch("http://localhost:5000/api/favorites/remove", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, movieId }),
      });
      setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };
  const removeFromWatchList = async (movieId) => {
    if (!user) return alert("Please log in");
    try {
      await fetch("http://localhost:5000/api/watchlist/remove", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, movieId }),
      });
      setWatchList((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const isFavorite = (movieId) =>
    Array.isArray(favorites) && favorites.some(movie => movie.id === movieId);  

  const isWatchListed = (movieId) =>
  Array.isArray(watchlist) && watchlist.some(movie => String(movie.id) === String(movieId));

      
  return (
    <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite,watchlist,addToWatchList,removeFromWatchList,isWatchListed }}>
      {children}
    </MovieContext.Provider>
  );
};
