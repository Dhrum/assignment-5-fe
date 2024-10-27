import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaLaptop, FaGamepad } from 'react-icons/fa';
import './Categories.css';
import { Helmet } from 'react-helmet-async';

// Helper function to generate a random number between 5 and 30
const getRandomProductCount = () => Math.floor(Math.random() * 26) + 5;

// Helper function to get the appropriate icon based on category
const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
        case 'smart phone':
            return <FaMobileAlt className="category-icon-image" />;
        case 'laptop':
            return <FaLaptop className="category-icon-image" />;
        case 'gaming console':
            return <FaGamepad className="category-icon-image" />;
        default:
            return <FaMobileAlt className="category-icon-image" />;
    }
};

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                const products = response.data;

                // Extract unique categories
                const uniqueCategories = [
                    ...new Set(products.map((product) => product.category)),
                ];

                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleViewProducts = (category) => {
        navigate(`/categories/${category}`);
    };

    return (
        <section className="categories">
            <Helmet>
                <title>Category - Glow Mart</title>
            </Helmet>
            <div className="categories-header">
                <h2>All Categories</h2>
            </div>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <div className="category-icon">
                            {getCategoryIcon(category)}
                        </div>
                        <div className="category-info">
                            <h3>{category.toUpperCase()}</h3>
                            <p>Explore our range of {category} products</p>
                            <span>{getRandomProductCount()} products</span>
                            <br/>
                            <button
                                onClick={() => handleViewProducts(category)}
                                className="view-products-button"
                            >
                                View Products
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
