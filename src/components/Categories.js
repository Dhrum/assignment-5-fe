// src/pages/Categories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
                setCategories(response.data.categories);
            } catch (error) {
                setError('Failed to load categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchCategories();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="categories-page">
            <h1>Categories</h1>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category._id}>
                        <Link to={`/categories/${category._id}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
