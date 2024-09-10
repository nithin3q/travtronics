import React, { useState } from "react";
import Product  from "./Product";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PRODUCTS } from "../components/Products";
import { CiSearch } from "react-icons/ci";
import "../assets/css/Shop.css";
function Shop  ()  {
  const [categoryFilters, setCategoryFilters] = useState({
    Electronics: true,
    Books: true,
    Clothes: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = Object.keys(categoryFilters).some(
      (cat) => categoryFilters[cat] && product.category === cat
    );
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilters({
      ...categoryFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMinPriceChange = (e) => {
    const minPrice = parseInt(e.target.value, 10) || 0; // Use 0 as fallback if invalid
    setPriceRange([minPrice, Math.max(minPrice, priceRange[1])]);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = parseInt(e.target.value, 10) || 10000; // Use max range as fallback
    setPriceRange([Math.min(priceRange[0], maxPrice), maxPrice]);
  };

  return (
    <div className="container-fluid mt-5" style={{ paddingTop: "5px" }}>
      <div className="d-flex">
        {/* Sidebar for filters */}
        <div
          className="sidebar"
          style={{
            width: "250px",
            padding: "10px",
            borderRight: "1px solid #ddd",
          }}
        >
          <h4>Filters</h4>
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
          <div>
            <h5>Price Range</h5>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              aria-labelledby="range-slider"
              style={{}}
            />
            <div className="price-inputs d-flex align-items-center">
              <select
                value={priceRange[0] === 0 ? "" : priceRange[0]}
                onChange={handleMinPriceChange}
                className="form-control mb-2"
                style={{
                  width: "100px",
                  marginRight: "10px",
                  // border: "none",
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
        </div>

        {/* Main content area */}
        <div className="flex-grow-1">
          <div className="filters mb-4 mt-3">
            <div
              className="search-container"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "5px",
                maxWidth: "220px",
              }}
            >
              <CiSearch style={{ marginRight: "5px", fontSize: "20px" }} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  style={{ margin: "10px" }}
                >
                  <Product value={product} />
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          <div className="pagination mt-4 d-flex justify-content-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span className="mx-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;