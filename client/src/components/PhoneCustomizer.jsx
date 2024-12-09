import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import phone1 from '../img/Phone Case Design 1.jpg';
import phone2 from '../img/Phone Case Design 2.jpg';
import phone3 from '../img/Phone Case Design 3.jpg';
import ReviewSection from './ReviewSection';

// Mapping of phone models to database item_ids
const PHONE_IDS = {
    'iPhone 15': 5,
    'iPhone 14': 6
};

const PHONE_PRICE = 24.99;

const PhoneCustomizer = () => {
    const { addToCart } = useContext(CartContext);
    const [selectedDesign, setSelectedDesign] = useState('1');
    const [selectedModel, setSelectedModel] = useState('iPhone 15');

    const getDisplayImage = () => {
        switch(selectedDesign) {
            case '1':
                return phone1;
            case '2':
                return phone2;
            case '3':
                return phone3;
            default:
                return phone1;
        }
    };

    const handleAddToCart = () => {
        const customizedProduct = {
            item_id: PHONE_IDS[selectedModel],
            title: `Phone Case ${selectedModel}`,
            design: `Design ${selectedDesign}`,
            color: 'Black',
            size: selectedModel,
            model: selectedModel,
            image: getDisplayImage(),
            price: PHONE_PRICE,
            quantity: 1,
            type: 'phone-case'
        };
        addToCart(customizedProduct);
    };

    return (
        <>
            <div className="customizer-container">
                <div className="product-preview">
                    <img src={getDisplayImage()} alt="Phone Case Preview" />
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
                        <h3>Select Phone Model</h3>
                        <div className="model-options">
                            <button
                                className={`model-btn ${selectedModel === 'iPhone 15' ? 'selected' : ''}`}
                                onClick={() => setSelectedModel('iPhone 15')}
                            >
                                iPhone 15
                            </button>
                            <button
                                className={`model-btn ${selectedModel === 'iPhone 14' ? 'selected' : ''}`}
                                onClick={() => setSelectedModel('iPhone 14')}
                            >
                                iPhone 14
                            </button>
                        </div>
                    </div>

                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart - ${PHONE_PRICE}
                    </button>
                </div>
            </div>
            <ReviewSection itemId={PHONE_IDS[selectedModel]} />
        </>
    );
};

export default PhoneCustomizer; 