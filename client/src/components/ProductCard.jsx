import React from 'react';
import '../styles.css';

const ProductCard = ({ imgSrc, title, description, price, onCustomize, isSelected }) => (
    <div className= 'product-card'>
        <img src={imgSrc} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="price">{price}</div>
        {!isSelected && <button className="css-button-3d--green" onClick={onCustomize}>Customize!</button>}
    </div>
);

export default ProductCard;