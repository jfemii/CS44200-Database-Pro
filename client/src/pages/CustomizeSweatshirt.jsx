import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SweatshirtCustomizer from '../components/SweatshirtCustomizer';

const CustomizeSweatshirt = () => {
    return (
        <div>
            <Navbar />
            <div className="customizer-page">
                <h2>Customize Your Sweatshirt</h2>
                <SweatshirtCustomizer />
            </div>
            <Footer />
        </div>
    );
};

export default CustomizeSweatshirt; 