
import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Movie from "./pages/Movie"
import { Route,Routes } from "react-router-dom"
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
        <Route path="/movie/:id" element={<Movie/>} />
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App
