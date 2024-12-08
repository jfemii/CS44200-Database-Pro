import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import wShirt1 from '../img/White Design 1 Shirt.jpg';
import wShirt2 from '../img/White Design 2 Shirt.jpg';
import bShirt1 from '../img/Black Design 1 Shirt.jpg';
import bShirt2 from '../img/Black Design 2 Shirt.jpg';

// Mapping of colors to database item_ids
const TSHIRT_IDS = {
    'white': 1,  // ID from Items table for white t-shirt
    'black': 2   // ID from Items table for black t-shirt
};

const ProductCustomizer = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState('white');
    const [selectedDesign, setSelectedDesign] = useState('1');
    const [selectedSize, setSelectedSize] = useState('M');

    const getDisplayImage = () => {
        if (selectedColor === 'white') {
            return selectedDesign === '1' ? wShirt1 : wShirt2;
        } else {
            return selectedDesign === '1' ? bShirt1 : bShirt2;
        }
    };

    const handleAddToCart = () => {
        const customizedProduct = {
            item_id: TSHIRT_IDS[selectedColor], // This will be 1 for white, 2 for black
            title: `Custom ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} T-Shirt`,
            color: selectedColor,
            design: `Design ${selectedDesign}`,
            size: selectedSize,
            image: getDisplayImage(),
            price: 29.99,
            quantity: 1,
            type: 't-shirt'
        };
        addToCart(customizedProduct);
    };

    return (
        <div className="customizer-container">
            <div className="product-preview">
                <img src={getDisplayImage()} alt="T-Shirt Preview" />
            </div>
            
            <div className="customization-options">
                {/* Color Selection */}
                <div className="option-section">
                    <h3>Select Color</h3>
                    <div className="color-options">
                        <button 
                            className={`color-btn ${selectedColor === 'white' ? 'selected' : ''}`}
                            onClick={() => setSelectedColor('white')}
                        >
                            White
                        </button>
                        <button 
                            className={`color-btn ${selectedColor === 'black' ? 'selected' : ''}`}
                            onClick={() => setSelectedColor('black')}
                        >
                            Black
                        </button>
                    </div>
                </div>

                {/* Design Selection */}
                <div className="option-section">
                    <h3>Select Design</h3>
                    <div className="design-options">
                        <button 
                            className={`design-btn ${selectedDesign === '1' ? 'selected' : ''}`}
                            onClick={() => setSelectedDesign('1')}
                        >
                            Design 1
                        </button>
                        <button 
                            className={`design-btn ${selectedDesign === '2' ? 'selected' : ''}`}
                            onClick={() => setSelectedDesign('2')}
                        >
                            Design 2
                        </button>
                    </div>
                </div>

                {/* Size Selection */}
                <div className="option-section">
                    <h3>Select Size</h3>
                    <div className="size-options">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                                key={size}
                                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart - $29.99
                </button>
            </div>
        </div>
    );
};

export default ProductCustomizer;
