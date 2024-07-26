import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBox.css";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showResults, setShowResults] = useState(false); // State to control visibility of search results
  const navigate = useNavigate();
  const searchRef = useRef(null); // Reference to the search box element

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchData();
      setShowResults(true); // Show search results when search query is not empty
    } else {
      setSearchResults([]);
      setShowResults(false); // Hide search results when search query is empty
    }
  }, [searchQuery]);
  

  useEffect(() => {
    // Close search results dropdown when clicking outside of it
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close search results dropdown when Escape key is pressed
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setShowResults(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/product/search?search=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true); // Show search results after fetching
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };
  const handleResultClick = (result) => {
    // Extract productId from the clicked result object
    const productId = result.id; // Assuming the result object has an 'id' property
  
    // Set the search query to the full name of the selected result
    setSearchQuery(result.name);
  
    // Navigate to the product details page with the extracted productId
    navigate(`/product/${productId}`);
  
    // Close search results after clicking on a result
    setShowResults(false);
  };
  
  
  

  return (
    <div className="search" ref={searchRef}>
      <input
        type="text"
        placeholder="Search For Products"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          } 
        }}
        onFocus={() => setShowResults(true)} // Show search results when input is focused
      />
      <a href="#" className="search-icon" onClick={handleSearch}>
        <i className="fa fa-search"></i>
      </a>
      {showResults && ( // Show search results dropdown if showResults is true
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className={`search-result ${
                result === selectedResult ? "selected" : ""
              }`}
              onClick={() => handleResultClick(result)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
