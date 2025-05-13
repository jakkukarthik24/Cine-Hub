import Watchlist from "./pages/Watchlist"
import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Movie from "./pages/Movie"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css'
import { MovieProvider } from "./contexts/MovieContext"
function App() {
  return (
    <MovieProvider>
      <NavBar></NavBar>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/watchlist" element={<Watchlist/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/movie/:id" element={<Movie/>} />
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App
