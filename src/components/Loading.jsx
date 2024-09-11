import React from 'react';
import '../assets/css/Login.css';
import brand from '../assets/images/brand.png';

function Loading() {
  return (
    <div className="loading-container">
      <img 
        src={brand}
        alt="Brand Logo"
        className="loading-logo"
      />
      <div className="spinner"></div>
    </div>
  );
}

export default Loading;