import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import axios from 'axios';
import './OrderDetails.css';

const OrderDetails = () => {
    const { state } = useLocation();
    const { product } = state;
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(product.price);
    const navigate = useNavigate();

    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value;
        setQuantity(newQuantity);
        setTotalPrice(product.price * newQuantity);
    };

    const handleConfirmOrder = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/purchases`, {
                productId: product._id,
                quantity,
                totalPrice,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Order confirmed!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    return (
        <div className="order-details-container">
            <h2>Order Details</h2>
            <div className="order-product">
                <img src={product.photoURL} alt={product.name} className="order-product-image" />
                <div className="order-info">
                    <h3>{product.name}</h3>
                    <p>Price per unit: ${product.price}</p>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                    />
                    <p>Total Price: ${totalPrice}</p>
                    <div className="coupon-section">
                        <input type="text" placeholder="Coupon Code" disabled />
                        <p>Discount Amount: $0</p>
                    </div>
                    <button onClick={handleConfirmOrder} className="btn-confirm-order">Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
