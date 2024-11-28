import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Form from '../components/Form';
import support from "../img/undraw_web_shopping_re_owap.png";

import '../styles.css';
import Feature from '../components/Feature'

const Contact = () => (
    <div>
        <Navbar />
        <h1 style={{ color: 'white', textAlign: 'center' }}>Contact Us</h1>
        <Form />
    <div style={{alignItems:'center', justifyContent: 'center', display: 'flex', margin:'10px'}}>
        <button className='css-button-3d--green'>Submit</button>
    </div>

    <Feature imgSrc={support} title="FAST SHIPPING!" description="Guaranteed delivery of your product to your door in less than a week." link={'/'}/>
            <Feature imgSrc={'../img/undraw_web_shopping_re_owap.png'} title="24/7 SUPPORT!" description="Our support team can be reached anytime through an email request." link={'/contact'}/>
            <Feature imgSrc={'../img/undraw_web_shopping_re_owap.png'} title="ABOUT US!" description="Learn more about the people that create the final product." link={'/about'}/>
    
        
    </div>
);

export default Contact;