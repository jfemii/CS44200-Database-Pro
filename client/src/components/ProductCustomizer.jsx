import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/CartContext"; // Import CartContext
import '../styles.css';
import wShirt1 from '../img/White Design 1 Shirt.jpg';
import wShirt2 from '../img/White Design 2 Shirt.jpg';
import wShirt3 from '../img/White Design 3 Shirt.jpg';
import bShirt1 from '../img/Black Design 1 Shirt.jpg';
import bShirt2 from '../img/Black Design 2 Shirt.jpg';
import bShirt3 from '../img/Black Design 3 Shirt.jpg';
import canvas1 from '../img/Canvas Design 1.jpg';
import canvas2 from '../img/Canvas Design 2.jpg';
import canvas3 from '../img/Canvas Design 3.jpg';

// Options and colors
const options = [
    { label: 'Clothing Design 1', imgSrc: wShirt1, title: 'Cotton Round Shirt', color: 'White' },
    { label: 'Clothing Design 2', imgSrc: wShirt2, title: 'Cotton Round Shirt', color: 'White' },
    { label: 'Clothing Design 3', imgSrc: wShirt3, title: 'Cotton Round Shirt', color: 'White' },
    { label: 'Clothing Design 1', imgSrc: bShirt1, title: 'Cotton Round Shirt', color: 'Black' },
    { label: 'Clothing Design 2', imgSrc: bShirt2, title: 'Cotton Round Shirt', color: 'Black' },
    { label: 'Clothing Design 3', imgSrc: bShirt3, title: 'Cotton Round Shirt', color: 'Black' },
    { label:'Canvas Design 1', imgSrc: canvas1, title: 'Canvas Portrait', color: 'White' },
    { label:'Canvas Design 2', imgSrc: canvas2, title: 'Canvas Portrait', color: 'White' },
    { label:'Canvas Design 3', imgSrc: canvas3, title: 'Canvas Portrait', color: 'White' }
];

const colors = [
    { label: 'White', color: 'White' },
    { label: 'Black', color: 'Black' },
];

const sizes = [
    { label: 'Small', size: 'S' },
    { label: 'Medium', size: 'M' },
    { label: 'Large', size: 'L' },
    { label: 'Extra Large', size: 'XL' }
];


const ProductCustomizer = ({ title, description, price, imgSrc }) => {
    const { addToCart } = useContext(CartContext); // Use addToCart from context
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imgSrc);
    const [selectedColor, setSelectedColor] = useState(colors[0].color);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
    const [selectedSize, setSelectedSize] = useState(sizes[0].size);

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
    const handleSizeChange = (size) => {
        setSelectedSize(size);
    }

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
                {(title === 'Cotton Round Shirt' || title === 'Cotton Hoodie') && (
                    <>
                        <h3>Select Size</h3>
                        <div className="options">
                            {sizes.map((sizeOption, index) => (
                                <button
                                    key={index}
                                    className={`option-button ${selectedSize === sizeOption.size ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange(sizeOption.size)}
                                >
                                    {sizeOption.label}
                                </button>
                            ))}
                        </div>

                    </>
                )}
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
