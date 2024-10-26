import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/purchases`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchases:', error.message);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Your Purchases</h3>
            {purchases.length > 0 ? (
                <ul>
                    {purchases.map((purchase) => (
                        <li key={purchase._id}>
                            {purchase.product.name} - {purchase.quantity} pcs - ${purchase.totalPrice}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No purchases found.</p>
            )}
        </div>
    );
};

export default Dashboard;
