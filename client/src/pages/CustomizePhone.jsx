import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneCustomizer from '../components/PhoneCustomizer';

const CustomizePhone = () => {
    return (
        <div>
            <Navbar />
            <div className="customizer-page">
                <h2>Customize Your Phone Case</h2>
                <PhoneCustomizer />
            </div>
            <Footer />
        </div>
    );
};

export default CustomizePhone; 