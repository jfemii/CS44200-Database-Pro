import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles.css';
import shirtStock from '../img/shirt stock.jpg';
import phoneCase from '../img/Phone case.jpg';
import canvasBlank from '../img/canvas blank.jpg';
import hoodieWhite from '../img/hoodie white.jpg';

const Cart = () => (
    <div>
        <Navbar />
        <main style={{ backgroundColor: '#aab39c' }}>
            <h2 style={{ color: 'white', margin: '15px', textAlign: 'center' }}><b>Your Cart</b></h2>
            <div className="cart-list">
                <div className="cart-item">
                    <img src={shirtStock} alt="Rounded Shirt" className="cart-item-image" />
                    <div className="cart-item-details">
                        <h2>Cotton Round Shirt</h2>
                        <p>A Well Blended Cotton Shirt With A Design Of Your Choosing.</p>
                        <div className="price">$29.99</div>
                        <button className="css-button-3d--green">Remove</button>
                    </div>
                </div>

                <div className="cart-item">
                    <img src={phoneCase} alt="IPhone Case" className="cart-item-image" />
                    <div className="cart-item-details">
                        <h2>IPhone Case</h2>
                        <p>A Durable and Unique Plastic Case To Protect Your IPhone.</p>
                        <div className="price">$19.99</div>
                        <button className="css-button-3d--green">Remove</button>
                    </div>
                </div>

                <div className="cart-item">
                    <img src={canvasBlank} alt="Canvas Portrait" className="cart-item-image" />
                    <div className="cart-item-details">
                        <h2>Canvas Portrait</h2>
                        <p>Add Some Flavor To A Room With One Of Our Canvas Designs!</p>
                        <div className="price">$9.99</div>
                        <button className="css-button-3d--green">Remove</button>
                    </div>
                </div>

                <div className="cart-item">
                    <img src={hoodieWhite} alt="Cotton Hoodie" className="cart-item-image" />
                    <div className="cart-item-details">
                        <h2>Cotton Hoodie</h2>
                        <p>Always Stay Warm With Our Double Layer Cotton Hoodies!</p>
                        <div className="price">$34.99</div>
                        <button className="css-button-3d--green">Remove</button>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className="css-button-3d--green">Proceed to Checkout</button>
            </div>
        </main>
        <Footer />
    </div>
);

export default Cart;
