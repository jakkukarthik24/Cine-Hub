import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("https://cine-hub.onrender.com/api/auth/register", {
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
                setError(data.message || "Registration failed");
            } else {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form">
            <div className="container">
                <h2>Register</h2>
                <form className="form" onSubmit={handleRegister}>
                    <div className="input">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder=""
                            maxLength="30"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input">
                        <input
                            type={showPassword ? "text" : "password"}
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
                            className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                            id="toggleIcon"
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="submit">
                        <button type="submit">Register</button>
                        <p className="signup-text">
                            Already have an account?<br />
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
