import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user') !== null;

    return (
        <div>
            <Navbar />
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <div className="confirmation-emoji">✅</div>
                    <h1>Thank You for Your Order!</h1>
                    <p>Your order has been successfully placed.</p>
                    <p>We'll send you an email confirmation with order details shortly.</p>
                    
                    <div className="confirmation-buttons">
                        <button 
                            onClick={() => navigate('/products')}
                            className="continue-shopping-btn"
                        >
                            Continue Shopping
                        </button>
                        {isLoggedIn && (
                            <button 
                                onClick={() => navigate('/myaccount')}
                                className="view-orders-btn"
                            >
                                View Orders
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation; 