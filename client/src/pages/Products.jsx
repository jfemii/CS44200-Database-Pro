// Products.jsx
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductCustomizer from '../components/ProductCustomizer';
import '../styles.css';
import { CartContext } from '../components/CartContext';
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

const Products = () => {
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [showGrid, setShowGrid] = useState(false);
    const [showCustomizer, setShowCustomizer] = useState(true);

    const { addToCart } = useContext(CartContext); // Using CartContext

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
        }, 500);
    };

    const handleAddToCartFromProductCard = (product) => {
        console.log('Adding to cart:', product); // Debugging
        addToCart(product); // Adding to the cart via context
    };

    const containerClass = selectedProductIndex === null ? `product-grid ${showGrid ? 'show' : ''}` : "body_temp";

    return (
        <div>
            <Navbar />
            <h1 className="product-h1">{selectedProductIndex === null ? "Our Products" : "Current Product"}</h1>
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
                                onAddToCart={() => handleAddToCartFromProductCard(product)}  // Correctly pass onAddToCart
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
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Products;
