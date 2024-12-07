import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext'; // Import CartContext
import '../styles.css';
import logo from '../img/logo 2.png';

const Navbar = () => {
    const { getTotalItems } = useContext(CartContext); // Use the getTotalItems function to get the count

    return (
        <nav>
            <div className="navTop">
                <div className="navItem">
                    <a href="/"><img src={logo} alt="Logo" width="200" height="200" /></a>
                </div>
            </div>
            <div className="navBottom">
                <div className="menuItem"><a href="/">Home</a></div>
                <div className="menuItem"><a href="/products">Products</a></div>
                <div className="menuItem"><a href="/about">About Us</a></div>
                <div className="menuItem"><a href="/contact">Contact</a></div>
                <div className="menuItem"><a href="/cart">Cart</a></div>
                
                {/* Cart Item Count */}
                <div className="cart-info">
                    <a href="/cart">Cart: {getTotalItems()} items</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
