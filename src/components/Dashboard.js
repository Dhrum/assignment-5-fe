import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/purchases/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPurchases(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>My Purchases</h2>
            <ul>
                {purchases.map((purchase) => (
                    <li key={purchase._id}>
                        Product: {purchase.productId.name}, Quantity: {purchase.quantity}, Total: ${purchase.totalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
