import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebaseConfig';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        profileImage: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await auth.currentUser?.getIdToken();
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setImagePreview(response.data.profilePicture || 'https://via.placeholder.com/150?text=Avatar');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser({ ...user, profileImage: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();

            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('phone', user.phone);
            formData.append('address', user.address);

            if (user.profileImage && user.profileImage instanceof File) {
                formData.append('profileImage', user.profileImage);
            }

            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsEditing(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-info">
                <div className="profile-image">
                    <img
                        src={imagePreview}
                        alt="Profile"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Avatar')}
                    />
                    {isEditing && (
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    )}
                </div>
                <div className="profile-details">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            disabled // Email is not editable
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </label>
                    {isEditing ? (
                        <button onClick={handleSaveChanges}>Save Changes</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
