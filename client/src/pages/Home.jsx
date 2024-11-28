import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Feature from '../components/Feature';
import ProductCard from '../components/ProductCard';
import '../styles.css';
import canvas from '../img/canvas blank.jpg'
import support from '../img/undraw_Active_support_re_b7sj.png'
import shipping from '../img/undraw_web_shopping_re_owap.png'
import aboutimg from '../img/undraw_About_us_page_re_2jfm.png'
//import support from '../img/undraw_Active_support_re_b7sj.png'
import logo from '../img/logo 2.png'

const Home = () => (
    <div>
        <Navbar />
        <main style={{ backgroundColor: '#aab39c' }}>
            <h2 style={{ color: 'white', margin: '15px' }}><b>Featured Products</b></h2>
                <ProductCard imgSrc= {canvas}></ProductCard>
        </main>
        <div className="features">
            <Feature imgSrc={shipping} title="FAST SHIPPING!" description="Guaranteed delivery of your product to your door in less than a week." link={'/'}/>
            <Feature imgSrc={support} title="24/7 SUPPORT!" description="Our support team can be reached anytime through an email request." link={'/contact'}/>
            <Feature imgSrc={aboutimg} title="ABOUT US!" description="Learn more about the people that create the final product." link={'/about'}/>
        </div>
        <Footer />
    </div>
    
);

export default Home;