import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import logo from '../img/logo 2.png';

const Navbar = () => {
    const { getTotalItems } = useContext(CartContext);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user') !== null;

    return (
        <nav>
            <div className="navbar-container">
                <div className="logo-section">
                    <a href="/"><img src={logo} alt="Logo" width="150" height="150" /></a>
                </div>
                <div className="nav-links">
                    <div className="menuItem"><a href="/">Home</a></div>
                    <div className="menuItem"><a href="/products">Products</a></div>
                    <div className="menuItem"><a href="/about">About Us</a></div>
                    <div className="menuItem"><a href="/contact">Contact</a></div>
                    <div className="menuItem"><a href="/cart">Cart ({getTotalItems()} items)</a></div>
                    <div className="menuItem">
                        {isLoggedIn ? (
                            <a href="/myaccount">My Account</a>
                        ) : (
                            <a href="/signin">Sign In</a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
