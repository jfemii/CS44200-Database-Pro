import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import blackSweatshirt from '../img/Black Sweatshirt.jpg';
import greySweatshirt from '../img/Grey Sweatshirt.jpg';

// Mapping of colors to database item_ids
const SWEATSHIRT_IDS = {
    'black': 7,
    'grey': 8
};

const SWEATSHIRT_PRICE = 39.99;

const SweatshirtCustomizer = () => {
    const { addToCart } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedSize, setSelectedSize] = useState('M');

    const getDisplayImage = () => {
        return selectedColor === 'black' ? blackSweatshirt : greySweatshirt;
    };

    const handleAddToCart = () => {
        const customizedProduct = {
            item_id: SWEATSHIRT_IDS[selectedColor],
            title: `Cotton Sweatshirt`,
            color: selectedColor,
            size: selectedSize,
            image: getDisplayImage(),
            price: SWEATSHIRT_PRICE,
            quantity: 1,
            type: 'sweatshirt'
        };
        addToCart(customizedProduct);
    };

    return (
        <div className="customizer-container">
            <div className="product-preview">
                <img src={getDisplayImage()} alt="Sweatshirt Preview" />
            </div>
            
            <div className="customization-options">
                <div className="option-section">
                    <h3>Select Color</h3>
                    <div className="color-options">
                        <button 
                            className={`color-btn ${selectedColor === 'black' ? 'selected' : ''}`}
                            onClick={() => setSelectedColor('black')}
                        >
                            Black
                        </button>
                        <button 
                            className={`color-btn ${selectedColor === 'grey' ? 'selected' : ''}`}
                            onClick={() => setSelectedColor('grey')}
                        >
                            Grey
                        </button>
                    </div>
                </div>

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
                    Add to Cart - ${SWEATSHIRT_PRICE}
                </button>
            </div>
        </div>
    );
};

export default SweatshirtCustomizer; 