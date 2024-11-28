import React from 'react';
import '../styles.css';

const Feature = ({ imgSrc, title, description, link}) => (
    <div className="feature">
        <a href={link}><img className="featureIcon" src={imgSrc} alt={title} /></a>
        <span className="featureTitle">{title}</span>
        <span className="featureDescription">{description}</span>
    </div>
);

export default Feature;