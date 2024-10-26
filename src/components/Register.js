import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, googleProvider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const token = await auth.currentUser?.getIdToken();
            console.log(token);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                name: formData.name,
                email: user.email,
                password: formData.password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/login');
        } catch (error) {
            console.error('Registration Error:', error.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithRedirect(auth, googleProvider);
            const { user } = result;
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google-signin`, {
                name: user.displayName,
                email: user.email,
                googleId: user.uid,
                profilePicture: user.photoURL,
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Google Sign-In Error:', error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            <button onClick={handleGoogleRegister}>Register with Google</button>
        </div>
    );
};

export default Register;
