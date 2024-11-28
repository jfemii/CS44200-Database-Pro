import React, { useState, useEffect } from "react";
import '../styles.css';
import wShirt1 from '../img/White Design 1 Shirt.jpg';
import wShirt2 from '../img/White Design 2 Shirt.jpg';
import wShirt3 from '../img/black shirt.jpg';
import bShirt1 from '../img/Black Design 1 Shirt.jpg';
import bShirt2 from '../img/Black Design 2 Shirt.jpg';

const options = [
    { label: 'White Shirt Design 1', imgSrc: wShirt1,  title: 'Cotton Round Shirt', color : 'white'},
    { label: 'White Shirt Design 2', imgSrc: wShirt2, title: 'Cotton Round Shirt', color : 'white'},
    { label: 'White Shirt Design 3', imgSrc: bShirt1, title: 'Cotton Round Shirt', color : 'white'},
    { label: 'Black Shirt Design 1', imgSrc: bShirt1, title: 'Cotton Round Shirt', color : 'black'},
    { label: 'Black Shirt Design 2', imgSrc: bShirt2, title: 'Cotton Round Shirt', color : 'black'},
];

const colors = [
    { label: 'White', color: 'white' },
    { label: 'Black', color: 'black' },
];

const ProductCustomizer = ({ imgSrc, title, description, price, onCustomize }) => {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imgSrc);
    const [selectedColor, setSelectedColor] = useState(colors[0].color);
    const [selectedOption, setSelectedOption] = useState(options[0]);

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

    const showClass = show ? 'container show' : 'container';

    return (
        <div className={showClass}>
            <img src={selectedImage} alt={title} />
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{price}</p>
                <div className="options-bar">
                    <h3 style={{marginLeft:'5px'}}>Select Color</h3>
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
                <p><button className='css-button-3d--green'>Add to Cart</button></p>
                <p><button className='css-button-3d--green' onClick={onCustomize}>Show All Products</button></p>
            </div>
        </div>
    );
};


export default ProductCustomizer;