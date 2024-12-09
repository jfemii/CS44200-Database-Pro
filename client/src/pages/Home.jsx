import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Feature from '../components/Feature';
import ProductCard from '../components/ProductCard';
import '../styles.css';
import tshirtImage from '../img/White Design 1 Shirt.jpg';
import support from '../img/undraw_Active_support_re_b7sj.png';
import shipping from '../img/undraw_web_shopping_re_owap.png';
import aboutimg from '../img/undraw_About_us_page_re_2jfm.png';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <main style={{ backgroundColor: '#aab39c' }}>
                <div className="featured-section">
                    <h2 className="featured-heading">Featured Products</h2>
                    <div className="featured-product-container">
                        <ProductCard 
                            imgSrc={tshirtImage}
                            title="Cotton Round Shirt"
                            description="A Well Blended Cotton Shirt With A Design Of Your Choosing."
                            price="$29.99"
                            onCustomize={() => navigate('/customize/tshirt')}
                        />
                    </div>
                </div>
            </main>
            <div className="features">
                <Feature imgSrc={shipping} title="FAST SHIPPING!" description="Guaranteed delivery of your product to your door in less than a week." link={'/'}/>
                <Feature imgSrc={support} title="24/7 SUPPORT!" description="Our support team can be reached anytime through an email request." link={'/contact'}/>
                <Feature imgSrc={aboutimg} title="ABOUT US!" description="Learn more about the people that create the final product." link={'/about'}/>
            </div>
            <Footer />
        </div>
    );
};

export default Home;