import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCustomizer from '../components/ProductCustomizer';

const CustomizeTshirt = () => {
    return (
        <div>
            <Navbar />
            <div className="customizer-page">
                <h2>Customize Your T-Shirt</h2>
                <ProductCustomizer />
            </div>
            <Footer />
        </div>
    );
};

export default CustomizeTshirt; 