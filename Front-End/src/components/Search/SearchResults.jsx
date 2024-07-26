/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    setSearchQuery(query || "");

    // Assuming fetchData function fetches the search results based on the search query
    fetchData(query);
  }, [location.search]);

  const fetchData = async (query) => {
    try {
      // Make API call to fetch search results
      const response = await fetch(
        `http://127.0.0.1:8000/api/product/search?search=${query}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <h2>Search Results for: {searchQuery}</h2>
      <div className="card-container">
        {products.map((product) => (
          <MDBCard key={product.id} className="mb-3">
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                src={`http://127.0.0.1:8000/Storage/${product.image[0].image}`}
                fluid
                alt={product.name}
              />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <MDBCardTitle>{product.name}</MDBCardTitle>
              <MDBCardText>{product.description}</MDBCardText>
              <p>Price: ${product.price}</p>
              <p>Discount Price: ${product.discount_price}</p>
              <MDBBtn href="#">Button</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
