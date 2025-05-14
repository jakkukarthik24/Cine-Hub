import "../css/Profile.css"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState(null);
    const navigate=useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  },[]);

  if (!user) return <p>You are not logged in.</p>;
  const handleLogout = () => {
    fetch("https://cine-hub.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
        navigate("/");
      })
      .catch(err => console.error("Logout failed", err));
  };
  return (
    <div className="profile-page">
      <h2 className="name">Welcome, {user.name}</h2>
      <div className="profile-buttons">
        <button className="fav-btn" onClick={() => navigate("/favorites")}>Favorites</button>
        <button className="fav-btn" onClick={() => navigate("/watchlist")}>Watchlist</button>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
