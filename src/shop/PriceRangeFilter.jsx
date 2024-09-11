// PriceRangeFilter.js
import React from "react";
import Slider from "@mui/material/Slider";

const PriceRangeFilter = ({
  priceRange,
  handlePriceRangeChange,
  handleMinPriceChange,
  handleMaxPriceChange,
}) => {
  return (
    <div>
      <h5>Price Range</h5>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        aria-labelledby="range-slider"
      />
      <div className="price-inputs d-flex align-items-center">
        <select
          value={priceRange[0] === 0 ? "" : priceRange[0]}
          onChange={handleMinPriceChange}
          className="form-control mb-2"
          style={{
            width: "100px",
            marginRight: "10px",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <option value="" disabled>
            Min
          </option>
          <option value="0">₹0</option>
          <option value="100">₹100</option>
          <option value="1000">₹1,000</option>
          <option value="2000">₹2,000</option>
          <option value="3000">₹3,000</option>
        </select>
        to
        <select
          value={priceRange[1] === 1000000 ? "" : priceRange[1]}
          onChange={handleMaxPriceChange}
          className="form-control mb-2"
          style={{
            width: "100px",
            marginLeft: "10px",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <option value="" disabled>
            Max
          </option>
          <option value="5000">₹5,000</option>
          <option value="10000">₹10,000</option>
          <option value="20000">₹20,000</option>
          <option value="50000">₹50,000</option>
          <option value="1000000">₹100,000+</option>
        </select>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
