import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard from '../components/OrderCard';

const MyAccount = () => {
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/orders/${userData.user_id}`);
                const data = await response.json();
                
                if (response.ok) {
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders:', data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userData.user_id]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div>
            <Navbar />
            <div className="account-container">
                {/* Account Information Section */}
                <div className="account-info">
                    <h2>Account Information</h2>
                    <div className="info-card">
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Password:</strong> {userData.password_field}</p>
                        <button 
                            className="logout-button"
                            onClick={() => setShowLogoutConfirm(true)}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Order History Section */}
                <div className="order-history">
                    <h2>Order History</h2>
                    <div className="orders-container">
                        {loading ? (
                            <p className="loading">Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <p className="no-orders">No orders yet</p>
                        ) : (
                            orders.map(order => (
                                <OrderCard key={order.orderId} order={order} />
                            ))
                        )}
                    </div>
                </div>

                {/* Logout Confirmation Modal */}
                {showLogoutConfirm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Confirm Logout</h3>
                            <p>Are you sure you want to logout?</p>
                            <div className="modal-buttons">
                                <button 
                                    className="confirm-button"
                                    onClick={handleLogout}
                                >
                                    Yes, Logout
                                </button>
                                <button 
                                    className="cancel-button"
                                    onClick={() => setShowLogoutConfirm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyAccount; 