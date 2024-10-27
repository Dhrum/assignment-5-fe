import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselComponent from '../components/CarouselComponent';
import HotProductComponent from '../components/HotProductComponent';
import CategoryListComponent from '../components/CategoryListComponent';
import TextBasedCarousel from '../components/TextBasedCarousel';
import FAQComponent from '../components/FAQComponent';
import './Home.css';

console.log('CarouselComponent:', CarouselComponent);
console.log('HotProductComponent:', HotProductComponent);
console.log('CategoryListComponent:', CategoryListComponent);
console.log('TextBasedCarousel:', TextBasedCarousel);
console.log('FAQComponent:', FAQComponent);

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                setProducts(response.data);
                const uniqueCategories = [...new Set(response.data.map(p => p.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const randomHotProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);

    return (
        <div className="home-container">
            <CarouselComponent />
            <HotProductComponent products={randomHotProducts} />
            <CategoryListComponent categories={categories} />
            <TextBasedCarousel />
            <FAQComponent />
        </div>
    );
};

export default Home;
