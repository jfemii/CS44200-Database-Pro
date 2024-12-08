import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart, getTotalItems } = useContext(CartContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('user'));
        
        try {
            const response = await fetch('http://localhost:8800/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userData ? userData.user_id : null,
                    customerInfo: formData,
                    items: cartItems,
                    totalAmount: getCartTotal(),
                    isGuestCheckout: !userData
                }),
            });

            if (response.ok) {
                clearCart();
                navigate('/order-confirmation');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="checkout-page">
                <div className="checkout-container">
                    <div className="checkout-form-container">
                        <h2>Checkout</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Shipping Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="order-summary-section">
                                <h3>Order Summary</h3>
                                <div className="order-details">
                                    <p>Total Items: {getTotalItems()}</p>
                                    <p>Total Amount: ${getCartTotal().toFixed(2)}</p>
                                </div>
                            </div>

                            <button type="submit" className="place-order-btn">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout; 