import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

function App() {
    return (
        <Router>
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products/:productId" element={<ProductDetails />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
