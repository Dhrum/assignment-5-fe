import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import './Products.css';
import { Helmet } from 'react-helmet-async';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const loadMoreProducts = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && visibleProducts < products.length) {
            setVisibleProducts((prev) => prev + 15);
        }
    }, [visibleProducts, products.length]);

    useEffect(() => {
        window.addEventListener('scroll', loadMoreProducts);
        return () => window.removeEventListener('scroll', loadMoreProducts);
    }, [loadMoreProducts]);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/200?text=No+Image'; // Placeholder for missing images
    };

    const addToCart = async (productId) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                navigate('/login');
                return;
            }
            const token = await user.getIdToken();
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const addToFavourites = async (productId) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                navigate('/login');
                return;
            }
            const token = await user.getIdToken();
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/favourites`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Product added to favourites!');
        } catch (error) {
            console.error('Error adding product to favourites:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="products-container">
            <Helmet>
                <title>Products - Glow Mart</title>
            </Helmet>
            <h2>All Products</h2>
            <div className="product-list">
                {products.slice(0, visibleProducts).map((product) => (
                    <div key={product._id} className="product-card animate-card">
                        <img
                            src={product.photoURL}
                            alt={product.name}
                            className="product-image"
                            onError={handleImageError}
                        />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <p className="product-sold">Sold: {product.sold || 0}</p>
                            <div className="product-rating">
                                ⭐ {product.rating || 4.5} ({product.reviews || 0} reviews)
                            </div>
                            <p className="product-description">{product.description}</p>
                            <div className="product-buttons">
                                <button onClick={() => addToCart(product._id)} className="btn btn-primary">
                                    Add to Cart
                                </button>
                                <button onClick={() => addToFavourites(product._id)} className="btn btn-secondary">
                                    ♥ Favourite
                                </button>
                                <Link to={`/products/${product._id}`} className="btn btn-view-details">
                                    View Details
                                </Link>
                                <button onClick={() => navigate(`/products/${product._id}/buy`)} className="btn btn-buy-now">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
