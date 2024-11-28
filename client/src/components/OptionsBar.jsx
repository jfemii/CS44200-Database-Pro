import React, { useState } from 'react';
import '../styles.css';
import wShirt1 from '../img/shirt stock.jpg';
import wShirt2 from '../img/Shirt Design.jpg';
import bShirt1 from '../img/black shirt.jpg';


const options = [
    { label: 'White Shirt Design 1', imgSrc: wShirt1 },
    { label: 'White Shirt Design 2', imgSrc: wShirt2 },
    { label: 'White Shirt Design 3', imgSrc: bShirt1 },
];

const OptionsBar = ({ onOptionSelect }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        onOptionSelect(option.imgSrc);
    };

    return (
        <div className="options-bar">
            <div className="options">
                {options.map((option, index) => (
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
    );
};

export default OptionsBar;