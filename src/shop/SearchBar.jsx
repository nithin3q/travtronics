// SearchBar.js
import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsFillFilterSquareFill } from "react-icons/bs";

const SearchBar = ({ searchTerm, setSearchTerm, setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div className="filters mb-4 mt-4">
      <div
        className="search-container d-flex align-items-center"
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "5px 10px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <CiSearch style={{ fontSize: "25px" }} />
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
            flex: 1,
            marginLeft: "10px",
          }}
        />
        <div className="d-block d-md-none">
          <BsFillFilterSquareFill
            color="blue"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ cursor: "pointer", fontSize: "25px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
