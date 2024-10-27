import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategoryListComponent.css';
import { FaEye, FaMobileAlt, FaLaptop, FaGamepad } from 'react-icons/fa';

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

const CategoryListComponent = ({ categories }) => {
    const navigate = useNavigate();
    const categorySliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };

    const handleViewProducts = (category) => {
        navigate(`/categories/${category}`);
    };

    return (
        <section className="categories">
            <div className="categories-header">
                <h2>Categories</h2>
                <a href="/categories" className="view-all-link">
                    <FaEye className="view-all-icon" /> View All
                </a>
            </div>
            <Slider {...categorySliderSettings} className="category-slider">
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
            </Slider>
        </section>
    );
};

export default CategoryListComponent;
