import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './ProductDetails.css';
import { Helmet } from 'react-helmet-async';
import BuyNowModal from './BuyNowModal';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBuyNowClick = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    const fetchProductDetails = async (user) => {
        try {
            const token = await user.getIdToken();
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchProductDetails(user);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [id, navigate]);

    const addToCart = async () => {
        try {
            const user = auth.currentUser;
            const token = await user.getIdToken();
            
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/cart/add`,
                {
                    productId: product._id,
                    quantity: 1, // You can adjust quantity as needed
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert('Product added to cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    const addToFavourites = async () => {
        try {
            const user = auth.currentUser;
            const token = await user.getIdToken();

            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/favourites/add`,
                {
                    productId: product._id,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert('Product added to favourites');
        } catch (error) {
            console.error('Error adding product to favourites:', error);
            alert('Failed to add product to favourites');
        }
    };

    const buyNow = () => {
        navigate(`/order/${product._id}`);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="product-details-container">
            <Helmet>
                <title>{product.name} - Glow Mart</title>
            </Helmet>
            <div className="product-image-section">
                <img
                    src={product.photoURL || 'https://via.placeholder.com/400?text=No+Image'}
                    alt={product.name}
                    className="product-image"
                />
            </div>
            <div className="product-info-section">
                <h2 className="product-title">{product.name}</h2>
                {product.description && <p className="product-description">{product.description}</p>}
                {product.price && <p className="product-price">Price: ${product.price}</p>}
                {product.stock && <p className="product-stock">Stock: {product.stock} units</p>}
                {product.brand && <p className="product-brand">Brand: {product.brand}</p>}
                {product.category && <p className="product-category">Category: {product.category}</p>}
                {product.sold !== undefined && <p className="product-sold">Sold: {product.sold}</p>}
                {product.rating && <p className="product-rating">Rating: ⭐ {product.rating} ({product.reviews} reviews)</p>}

                <div className="product-buttons">
                    <button onClick={addToCart} className="btn btn-primary">
                        Add to Cart
                    </button>
                    <button onClick={addToFavourites} className="btn btn-secondary">
                        ♥ Favourite
                    </button>
                    <button onClick={handleBuyNowClick} className="btn btn-buy-now">
                        Buy Now
                    </button>
                    <BuyNowModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        productId={product._id}
                        productName={product.name}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
