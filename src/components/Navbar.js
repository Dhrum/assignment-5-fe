import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!auth.currentUser;

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>Glowmart</h1>
            </div>
            <div className="navbar-middle">
                <Link to="/">Products</Link>
                <Link to="/categories">Categories</Link>
            </div>
            <div className="navbar-right">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
