import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CanvasCustomizer from '../components/CanvasCustomizer';

const CustomizeCanvas = () => {
    return (
        <div>
            <Navbar />
            <div className="customizer-page">
                <h2>Customize Your Canvas Landscape</h2>
                <CanvasCustomizer />
            </div>
            <Footer />
        </div>
    );
};

export default CustomizeCanvas; 