import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../context/AuthContext";
import {signIn} from "../services/auth";
import "../auth.scss"

const SignIn = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const navigate = useNavigate()
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        try {
            const response = await signIn(data);
            login(response.token);
            navigate('/')
        } catch (error) {
            alert('Unsuccessful sign in - check username/password.')
            console.error(error);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5234/api/Auth/google-login";
    };

    return (
        <div className="auth-page">
            <div className="auth-hero">
                <h2>Sign In</h2>
            </div>

            <div className="auth-form">
            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="input-field">
                <label>Username</label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-field">
                <label>Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="btn" type="submit">Sign in</button>
                <button onClick={handleGoogleLogin}>
                    Sign in with Google
                </button>
            </form>
            </div>
        </div>
    );
};

export default SignIn;