import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext'; // Import CartContext
import Navbar from '../components/Navbar'; // Assuming Navbar is already created
import Footer from '../components/Footer'; // Assuming Footer is already created

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext); // Get cart items from context

    return (
        <div className="cart-page">
            <Navbar />
            <h1 className="cart-header" style={{color: 'white'}}>Your cart</h1>
            {cartItems.length === 0 ? (
                <div style={{justifyContent: 'center', alignContent: 'center'}}>
                <p className="empty-cart" style={{color: 'white', justifyContent: 'center'}}>Your cart is empty</p>
                </div> // Message when no items in the cart
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-image">
                                <img src={item.imgSrc} alt={item.title} />
                            </div>
                            <div className="item-details">
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Color: {item.color}</p>
                                <p>Design: {item.label}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.price}</p>
                                <button onClick={() => removeFromCart(index)}>Remove</button> {/* Remove item from cart */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Cart;
