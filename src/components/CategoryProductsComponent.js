import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Products.css'; // Reuse the existing styles for consistent design

const CategoryProductsComponent = () => {
    const { categoryName } = useParams(); // Get category name from the URL
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState(15);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                setAllProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products by category once all products are fetched or when categoryName changes
        const filtered = allProducts.filter(product => product.category === categoryName);
        setFilteredProducts(filtered);
    }, [allProducts, categoryName]);

    const loadMoreProducts = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && visibleProducts < filteredProducts.length) {
            setVisibleProducts((prev) => prev + 15);
        }
    }, [visibleProducts, filteredProducts.length]);

    useEffect(() => {
        window.addEventListener('scroll', loadMoreProducts);
        return () => window.removeEventListener('scroll', loadMoreProducts);
    }, [loadMoreProducts]);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/200?text=No+Image';
    };

    const addToCart = (productId) => {
        alert(`Product ${productId} added to cart!`);
    };

    const addToFavourites = (productId) => {
        alert(`Product ${productId} added to favourites!`);
    };

    if (loading) return <p>Loading products in {categoryName}...</p>;

    return (
        <div className="products-container">
            <h2>{categoryName.toUpperCase()} Products</h2>
            {filteredProducts.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="product-list">
                    {filteredProducts.slice(0, visibleProducts).map((product) => (
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
                                    <button onClick={() => alert('Buy Now action')} className="btn btn-buy-now">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryProductsComponent;
