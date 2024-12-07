import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/CartContext"; // Import CartContext
import '../styles.css';
import wShirt1 from '../img/White Design 1 Shirt.jpg';
import wShirt2 from '../img/White Design 2 Shirt.jpg';
import wShirt3 from '../img/black shirt.jpg';
import bShirt1 from '../img/Black Design 1 Shirt.jpg';
import bShirt2 from '../img/Black Design 2 Shirt.jpg';

// Options and colors
const options = [
    { label: 'White Shirt Design 1', imgSrc: wShirt1, title: 'Cotton Round Shirt', color: 'white' },
    { label: 'White Shirt Design 2', imgSrc: wShirt2, title: 'Cotton Round Shirt', color: 'white' },
    { label: 'White Shirt Design 3', imgSrc: wShirt3, title: 'Cotton Round Shirt', color: 'white' },
    { label: 'Black Shirt Design 1', imgSrc: bShirt1, title: 'Cotton Round Shirt', color: 'black' },
    { label: 'Black Shirt Design 2', imgSrc: bShirt2, title: 'Cotton Round Shirt', color: 'black' },
];

const colors = [
    { label: 'White', color: 'white' },
    { label: 'Black', color: 'black' },
];

const ProductCustomizer = ({ title, description, price, imgSrc }) => {
    const { addToCart } = useContext(CartContext); // Use addToCart from context
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imgSrc);
    const [selectedColor, setSelectedColor] = useState(colors[0].color);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    useEffect(() => {
        setShow(true);
    }, []);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        const firstOption = options.find(option => option.color === color && option.title === title);
        setSelectedOption(firstOption);
        setSelectedImage(firstOption.imgSrc);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setSelectedImage(option.imgSrc);
    };

    const handleAddToCart = () => {
        // Create a product object with title, description, price, quantity
        const productWithQuantity = {
            title,
            description,
            price,
            quantity: parseInt(quantity),
            imgSrc: selectedImage,
            color: selectedColor,
            label: selectedOption.label
        };
        
        addToCart(productWithQuantity); // Add the product to the cart
        
        // Show popup for feedback and hide after 3 seconds
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    const showClass = show ? 'container show' : 'container';

    return (
        <div className={showClass}>
            <img src={selectedImage} alt={title} />
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>Price: {price}</p>
                <div className="options-bar">
                    <h3 style={{ marginLeft: '5px' }}>Select Color</h3>
                    <div className="options">
                        {colors.map((colorOption, index) => (
                            <button
                                key={index}
                                className={`option-button ${selectedColor === colorOption.color ? 'selected' : ''}`}
                                onClick={() => handleColorChange(colorOption.color)}
                            >
                                {colorOption.label}
                            </button>
                        ))}
                    </div>
                    <h3>Select Design</h3>
                    <div className="options">
                        {options.filter(option => option.color === selectedColor && option.title === title).map((option, index) => (
                            <button
                                key={index}
                                className={`option-button ${selectedOption.label === option.label ? 'selected' : ''}`}
                                onClick={() => handleOptionChange(option)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Control */}
                <div className="quantity-control">
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                {/* Add to Cart Button */}
                <button className="css-button-3d--green" onClick={handleAddToCart}>Add to Cart</button>
                
                {/* Popup Message */}
                {showPopup && (
                    <div className="popup">
                        <p>Item added to cart!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCustomizer;
