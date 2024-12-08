// Products.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import tshirtImage from '../img/White Design 1 Shirt.jpg';
import canvasImage from '../img/Canvas Design 1.jpg';
import phoneImage from '../img/Phone Case Design 1.jpg';
import blackSweatshirt from '../img/Black Sweatshirt.jpg';
// Import other product images when ready

const Products = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="products-container">
                <h1>Our Products</h1>
                <div className="products-grid">
                    <div className="product-card">
                        <img src={tshirtImage} alt="Cotton Round Shirt" />
                        <h3>Cotton Round Shirt</h3>
                        <p>Customize your own T-Shirt!</p>
                        <button onClick={() => navigate('/customize/tshirt')}>
                            Customize!
                        </button>
                    </div>

                    <div className="product-card">
                        <img src={canvasImage} alt="Canvas Landscape" />
                        <h3>Canvas Landscape</h3>
                        <p>Create your perfect canvas!</p>
                        <button onClick={() => navigate('/customize/canvas')}>
                            Customize!
                        </button>
                    </div>

                    <div className="product-card">
                        <img src={phoneImage} alt="Phone Case" />
                        <h3>Phone Case</h3>
                        <p>Design your unique phone case!</p>
                        <button onClick={() => navigate('/customize/phone')}>
                            Customize!
                        </button>
                    </div>

                    <div className="product-card">
                        <img src={blackSweatshirt} alt="Cotton Sweatshirt" />
                        <h3>Cotton Sweatshirt</h3>
                        <p>Design your perfect sweatshirt!</p>
                        <button onClick={() => navigate('/customize/sweatshirt')}>
                            Customize!
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
