import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                email: user.email,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login Error:', error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Initiate Google sign-in with a popup
            const result = await signInWithPopup(auth, googleProvider);
            const { user } = result;
    
            // Obtain the ID token from Firebase user
            const idToken = await user.getIdToken();
    
            // Prepare the payload to send to your backend
            const payload = {
                name: user.displayName,
                email: user.email,
                googleId: user.uid,
                profilePicture: user.photoURL,
            };
    
            // Make a POST request to your backend's google-signin route
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/google-signin`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Include the ID token for verification
                    },
                }
            );
    
            // Save the JWT token from the backend in local storage for session management
            localStorage.setItem('token', response.data.token);
    
            // Navigate the user to the dashboard after successful sign-in
            navigate('/dashboard');
        } catch (error) {
            // Log the error and show an appropriate message if needed
            console.error('Google Sign-In Error:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
