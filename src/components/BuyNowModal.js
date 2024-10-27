import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { auth } from '../firebaseConfig';
import './BuyNowModal.css'; // Add your custom styling here

Modal.setAppElement('#root'); // Specify your root app element for accessibility

const BuyNowModal = ({ isOpen, onClose, productId, productName }) => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { name, email, phone } = response.data;
          setUserData({ name, email, phone });
        }
      } catch (error) {
        setError('Failed to load user data.');
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/purchases/buy`,
        {
          productId,
          quantity: 1,
          ...userData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Purchase successful!');
      onClose();
    } catch (error) {
      setError('Purchase failed. Please try again.');
      console.error('Error making purchase:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="buy-now-modal">
      <h2>Buy Now - {productName}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handlePurchase} className="buy-now-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </div>
      </form>
      <button onClick={onClose} className="btn btn-secondary">
        Cancel
      </button>
    </Modal>
  );
};

export default BuyNowModal;
