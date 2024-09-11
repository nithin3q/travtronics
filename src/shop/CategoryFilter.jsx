// CategoryFilter.js
import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CategoryFilter = ({ categoryFilters, handleCategoryChange }) => {
  return (
    <div className="mb-3 border-top border-bottom py-2">
      <h5>Categories</h5>
      {Object.keys(categoryFilters).map((category) => (
        <FormControlLabel
          key={category}
          control={
            <Checkbox
              checked={categoryFilters[category]}
              onChange={handleCategoryChange}
              name={category}
            />
          }
          label={category}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
