import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import canvas1 from '../img/Canvas Design 1.jpg';
import canvas2 from '../img/Canvas Design 2.jpg';
import canvas3 from '../img/Canvas Design 3.jpg';

// Mapping of sizes to database item_ids
const CANVAS_IDS = {
    '24x18': 3,  // ID for smaller canvas
    '36x24': 4   // ID for larger canvas
};

// Mapping of sizes to prices
const CANVAS_PRICES = {
    '24x18': 34.99,
    '36x24': 49.99
};

const CanvasCustomizer = () => {
    const { addToCart } = useContext(CartContext);
    const [selectedDesign, setSelectedDesign] = useState('1');
    const [selectedSize, setSelectedSize] = useState('24x18');

    const getDisplayImage = () => {
        switch(selectedDesign) {
            case '1':
                return canvas1;
            case '2':
                return canvas2;
            case '3':
                return canvas3;
            default:
                return canvas1;
        }
    };

    const handleAddToCart = () => {
        const customizedProduct = {
            item_id: CANVAS_IDS[selectedSize],
            title: `Canvas Landscape ${selectedSize}`,
            design: `Design ${selectedDesign}`,
            size: selectedSize,
            image: getDisplayImage(),
            price: CANVAS_PRICES[selectedSize],
            quantity: 1,
            type: 'canvas-painting'
        };
        addToCart(customizedProduct);
    };

    return (
        <div className="customizer-container">
            <div className="product-preview">
                <img src={getDisplayImage()} alt="Canvas Preview" />
            </div>
            
            <div className="customization-options">
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
                        <button 
                            className={`design-btn ${selectedDesign === '3' ? 'selected' : ''}`}
                            onClick={() => setSelectedDesign('3')}
                        >
                            Design 3
                        </button>
                    </div>
                </div>

                <div className="option-section">
                    <h3>Select Size</h3>
                    <div className="size-options">
                        <button
                            className={`size-btn ${selectedSize === '24x18' ? 'selected' : ''}`}
                            onClick={() => setSelectedSize('24x18')}
                        >
                            24" x 18" - $34.99
                        </button>
                        <button
                            className={`size-btn ${selectedSize === '36x24' ? 'selected' : ''}`}
                            onClick={() => setSelectedSize('36x24')}
                        >
                            36" x 24" - $49.99
                        </button>
                    </div>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart - ${CANVAS_PRICES[selectedSize]}
                </button>
            </div>
        </div>
    );
};

export default CanvasCustomizer; 