import { Link,useNavigate } from "react-router-dom";
import '../css/NavBar.css';
import { useState,useEffect} from "react";
function NavBar(){
    const navigate = useNavigate();
    const [user,setUser]=useState(null);
    const [menu,setMenu]=useState(false);
    const handleMenu=()=>{
        setMenu(prev=>!prev);
    }
    const handleLogout = () => {
        fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          credentials: "include",
        })
          .then(() => {
            localStorage.removeItem("user");
            window.location.reload();
            setUser(null);
            navigate("/");
          })
          .catch(err => console.error("Logout failed", err));
      };
    useEffect(()=>{
        const storedUser=localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[]);
    return(
        <nav className="navbar">
            <div className="nav-name">
                <Link to="/">Cine Hub</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                {user ? (
                    <div className="dropdown">
                        <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={handleMenu}></i><br/>
                        {menu && (
                            <div className="dropdownMenu">
                                <Link to="/profile" className="profile" onClick={() => setMenu(false)}>Profile</Link><br/>
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                    
                ):(
                    <Link to="/login" className="nav-link">Login</Link>
                )
                }
            </div>
        </nav>
    )
}
export default NavBar