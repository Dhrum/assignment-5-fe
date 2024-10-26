// components/AdminProductManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', brand: '', category: '', price: 0, stock: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/api/products/${editProductId}`, formData);
                setIsEditing(false);
                setEditProductId(null);
            } else {
                await axios.post('/api/products', formData);
            }
            fetchProducts();
            setFormData({ name: '', brand: '', category: '', price: 0, stock: 0 });
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
        setEditProductId(product._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Manage Products</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
                <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price} - {product.stock} in stock
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProductManagement;
