import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles.css';

const About = () => (
    <div>
        <Navbar />
        <h1 style={{ color: 'white', textAlign: 'center' }}>About Us</h1>
        <p style={{ color: 'white', marginTop: '15px', padding: '15px', lineHeight: '2', fontWeight: '600', marginLeft: '150px', marginRight: '150px', lineHeight: '3'}}>
        Designs For You is a passion project started by four students from Purdue University Northwest. We wanted to create a platform where people could express themselves through custom products and through our designs our team has currated and we believe we have done just that. We hope you enjoy our products and we are always open to feedback.
        </p>
        <Footer />
    </div>
);

export default About;