import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getTotalItems } = useContext(CartContext);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                <h1>Your Cart</h1>
                
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <button onClick={() => navigate('/products')}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.title}</h3>
                                        <p>Color: {item.color}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Design: {item.design}</p>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button 
                                                onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p>Price: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        <button 
                                            className="remove-button"
                                            onClick={() => removeFromCart(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <h3>Cart Summary</h3>
                            <p>Total Items: {getTotalItems()}</p>
                            <p>Total Price: ${getCartTotal().toFixed(2)}</p>
                            <button 
                                className="checkout-button"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
