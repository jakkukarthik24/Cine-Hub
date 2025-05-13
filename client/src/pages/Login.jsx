import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                setError(data.error || "Login failed");
            } else {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form">
            <div className="container">
                <h2>Login</h2>
                <form className="form" onSubmit={handleLogin}>
                    <div className="input">
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="" 
                            name="username" 
                            maxLength="30" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className="input">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id="password" 
                            name="password" 
                            placeholder="" 
                            maxLength="30" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <label htmlFor="password">Password</label>
                        <i
                            className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                            id="toggleIcon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div className="submit">
                        <button type="submit">Login</button>
                        <p className="signup-text">
                            Don't have an account?<br />
                            <Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
