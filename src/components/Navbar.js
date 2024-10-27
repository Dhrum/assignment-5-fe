import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import './Navbar.css';
import logo from '../assets/logo-bg.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const isAuthenticated = !!auth.currentUser;
    const profileImageUrl = auth.currentUser?.photoURL || 'https://via.placeholder.com/40?text=Profile';

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
            <Link to="/" className="navbar-logo">
                    <img src={logo} alt="Glowmart Logo" className="logo-image" />
                    <h1>Glowmart</h1>
                </Link>
            </div>
            <div className="navbar-middle">
                <Link to="/products">Products</Link>
                <Link to="/categories">Categories</Link>
            </div>
            <div className="navbar-right">
                {isAuthenticated ? (
                    <div className="profile-section">
                        <div className="profile-menu" onClick={toggleDropdown}>
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className="profile-image"
                            />
                            <span className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`}>▼</span>
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                            </div>
                        )}
                        <button onClick={handleLogout} className="btn-logout">
                            Logout
                        </button>
                        <Link to="/cart" className="cart-icon">
                            🛒
                        </Link>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
