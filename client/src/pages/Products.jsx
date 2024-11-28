import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductCustomizer from '../components/ProductCustomizer';
import '../styles.css';
import shirt_white_1 from '../img/shirt stock.jpg';
import pcase from '../img/Phone case.jpg';
import canvas from '../img/canvas blank.jpg';
import hoodie from '../img/hoodie.png';

const products = [
    { imgSrc: shirt_white_1, title: "Cotton Round Shirt", description: "A Well Blended Cotton Shirt With A Design Of Your Choosing.", price: "$29.99", color: 'white' },
    { imgSrc: pcase, title: "IPhone Case", description: "A Durable and Unique Plastic Case To Protect Your IPhone.", price: "$19.99" },
    { imgSrc: canvas, title: "Canvas Portrait", description: "Add Some Flavor To A Room With One Of Our Canvas Designs!", price: "$34.99" },
    { imgSrc: hoodie, title: "Cotton Hoodie", description: "Always Stay Warm With Our Double Layer Cotton Hoodies!", price: "$34.99" }
];

const Our_Products = "Our Products";
const currentProduct = "Current Product";

const Products = () => {
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [showGrid, setShowGrid] = useState(false);
    const [showCustomizer, setShowCustomizer] = useState(true);

    useEffect(() => {
        setShowGrid(true);
    }, []);

    const handleShowProduct = (index) => {
        setSelectedProductIndex(index);
        setShowCustomizer(true);
    };

    const handleShowAllProducts = () => {
        setShowCustomizer(false);
        setTimeout(() => {
            setSelectedProductIndex(null);
            setShowGrid(true);
        }, 500); // Match the transition duration
    };

    const containerClass = selectedProductIndex === null ? `product-grid ${showGrid ? 'show' : ''}` : "body_temp";

    return (
        <div>
            <Navbar />
            <h1 className="product-h1">{selectedProductIndex === null ? Our_Products : currentProduct}</h1>
            <div className={containerClass} style={{ justifyContent: 'center' }}>
                {selectedProductIndex === null ? (
                    products.map((product, index) => (
                        <div key={index} className={`product-card ${showGrid ? 'show' : ''}`}>
                            <ProductCard 
                                imgSrc={product.imgSrc} 
                                title={product.title} 
                                description={product.description} 
                                price={product.price} 
                                onCustomize={() => handleShowProduct(index)}
                                isSelected={false}
                            />
                        </div>
                    ))
                ) : (
                    <ProductCustomizer 
                        imgSrc={products[selectedProductIndex].imgSrc} 
                        title={products[selectedProductIndex].title} 
                        description={products[selectedProductIndex].description} 
                        price={products[selectedProductIndex].price} 
                        onCustomize={handleShowAllProducts}
                        isSelected={true}
                        className={showCustomizer ? 'show' : ''}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Products;