import React, { useState } from 'react';
import '../assets/css/Sidebar.css'; // Add your custom CSS for the sidebar

const categories = ['Electronics', 'Books', 'Clothes']; // Add more categories as needed

function Sidebar  ({ 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter, 
  priceRange, 
  setPriceRange 
})  {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(prev => {
      const newCategories = prev.includes(value) 
        ? prev.filter(cat => cat !== value) 
        : [...prev, value];
      setCategoryFilter(newCategories);
      return newCategories;
    });
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setPriceRange([min, max]);
  };

  return (
    <div className="sidebar">
      <h4>Filters</h4>
      <div className="filter-category">
        <label>Categories</label>
        {categories.map((cat) => (
          <div key={cat} className="form-check">
            <input 
              type="checkbox" 
              id={cat} 
              value={cat} 
              checked={selectedCategories.includes(cat)}
              onChange={handleCategoryChange}
            />
            <label htmlFor={cat}>{cat}</label>
          </div>
        ))}
      </div>
      <div className="filter-price">
        <label>Price Range</label>
        <input 
          type="range" 
          min="0" 
          max="100000" 
          step="1000" 
          value={priceRange.join(',')} 
          onChange={handlePriceChange}
        />
        <div className="price-values">
          <span>₹ {priceRange[0]}</span>
          <span>₹ {priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;