import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import './Dashboard.css';

const Dashboard = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userPurchases, setUserPurchases] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [adminData, setAdminData] = useState({
        users: [],
        products: [],
        categories: [],
    });
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRole(response.data.role);
            setLoading(false);

            if (response.data.role === 'admin') {
                await fetchAdminData(token);
            } else {
                await fetchUserPurchases(token);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.response?.data || error);
        }
    };

    const fetchUserPurchases = async (token) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/purchases/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserPurchases(response.data);
        } catch (error) {
            console.error('Error fetching user purchases:', error.response?.data || error);
        }
    };

    const fetchCartItems = async (token) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error.response?.data || error);
        }
    };

    const fetchFavouriteItems = async (token) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/favourites/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavouriteItems(response.data);
        } catch (error) {
            console.error('Error fetching favourite items:', error.response?.data || error);
        }
    };

    const fetchAdminData = async (token) => {
        try {
            const usersResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const productsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const categories = Array.from(new Set(productsResponse.data.map((product) => product.category)));

            setAdminData({
                users: usersResponse.data,
                products: productsResponse.data,
                categories,
            });
        } catch (error) {
            console.error('Error fetching admin data:', error.response?.data || error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            {role === 'admin' ? (
                <AdminDashboard adminData={adminData} navigate={navigate} />
            ) : (
                <UserDashboard
                userPurchases={userPurchases}
                cartItems={cartItems}
                favouriteItems={favouriteItems}
            />
            )}
        </div>
    );
};

const AdminDashboard = ({ adminData, navigate }) => {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="admin-card">
                <h3>All Users</h3>
                <div className="scrollable-table">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminData.users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button 
                                            className="btn-action"
                                            onClick={() => navigate(`/profile`)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn-action">Toggle Role</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="admin-card">
                <h3>All Categories</h3>
                <div className="categories-grid">
                    {adminData.categories.map((category, index) => (
                        <div key={index} className="category-card">
                            <h4>{category.toUpperCase()}</h4>
                            <p>{Math.floor(Math.random() * 26) + 5} Products</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="admin-card">
                <h3>All Products</h3>
                <div className="scrollable-table">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Sold</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminData.products.slice(0, 15).map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.sold}</td>
                                    <td>
                                        <button className="btn-action">Edit</button>
                                        <button className="btn-action">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const UserDashboard = ({ userPurchases, cartItems, favouriteItems }) => {
    return (
        <div className="user-dashboard">
            <h2>User Dashboard</h2>
            <section className="user-section">
                <h3>My Purchases</h3>
                {userPurchases.length > 0 ? (
                    <table className="purchase-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Unit</th>
                                <th>Total Price</th>
                                <th>Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPurchases.map((purchase) => (
                                <tr key={purchase._id}>
                                    <td>{purchase.productId?.name || 'N/A'}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>${purchase.productId?.price.toFixed(2) || 'N/A'}</td>
                                    <td>${purchase.totalPrice.toFixed(2)}</td>
                                    <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No purchases found.</p>
                )}
            </section>
            <section className="user-section">
                <h3>My Cart</h3>
                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            <h4>{item.productId.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.productId.price}</p>
                            <p>Total: ${item.quantity * item.productId.price}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="user-section">
                <h3>My Favourites</h3>
                <div className="favourite-list">
                    {favouriteItems.map((item) => (
                        <div key={item._id} className="favourite-item">
                            <h4>{item.productId.name}</h4>
                            <p>Price: ${item.productId.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
