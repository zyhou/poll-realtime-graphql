import React from 'react';
import './HalfCircle.css';

const HalfCircle = ({ percent }) => (
    <div className="half-circle" style={{ '--percentage': percent }}></div>
);

export default HalfCircle;
