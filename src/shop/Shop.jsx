import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import "../assets/css/Shop.css";
import { Button, Spinner } from "react-bootstrap";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import SearchBar from "./SearchBar";

function Shop() {
  const [categoryFilters, setCategoryFilters] = useState({
    Electronics: true,
    Books: true,
    Clothes: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch products from JSON Server
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
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

  // Paginate filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => {
    setLoading(true);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    setLoading(false);
  };

  const handleNextPage = () => {
    setLoading(true);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    setLoading(false);
  };

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
    const minPrice = parseInt(e.target.value, 10) || 0;
    setPriceRange([minPrice, Math.max(minPrice, priceRange[1])]);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = parseInt(e.target.value, 10) || 1000000;
    setPriceRange([Math.min(priceRange[0], maxPrice), maxPrice]);
  };

  return (
    <div className="container-fluid mt-5" style={{ paddingTop: "5px" }}>
      <div className="row">
        {/* Sidebar as a collapsible section */}
        <div
          id="sidebar"
          className={`col-12 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mb-3 ${
            isSidebarOpen ? "collapse show" : "collapse"
          } d-md-block`}
          style={{
            padding: "15px",
            borderRight: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h4 className="d-none d-lg-block">Filters</h4>
          <CategoryFilter
            categoryFilters={categoryFilters}
            handleCategoryChange={handleCategoryChange}
          />
          <PriceRangeFilter
            priceRange={priceRange}
            handlePriceRangeChange={handlePriceRangeChange}
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
          />
        </div>

        {/* Main content area */}
        <div className="col-12 col-md-8 col-lg-9 col-xxl-10">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="spinner-container d-flex justify-content-center align-items-center">
              <Spinner animation="border" />
            </div>
          )}

          {/* Product Grid */}
          <div className="d-flex flex-wrap justify-content-center ">
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
              !loading && <p>No products found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination mt-4 d-flex justify-content-center">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1 || loading}
              variant="outline-secondary"
              style={{ marginRight: "10px" }}
            >
              Previous
            </Button>
            <span className="mx-3" style={{ fontSize: "1rem" }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || loading}
              variant="outline-secondary"
              style={{ marginLeft: "10px" }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
