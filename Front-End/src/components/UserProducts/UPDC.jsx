import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import CircularProgress from "@mui/material/CircularProgress";
import "../Products/ProductDetails/PDC.css";

const UPDC = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [image, setImage] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const { accessToken } = getAuthUser();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        console.log("Fetched product data:", data);

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products: " + error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId, accessToken]);

  useEffect(() => {
    const fetchCategory = async (categoryId) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/categories/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching category");
        }
        const categoryData = await response.json();
        console.log("Fetched category data:", categoryData);
        setCategoryData(categoryData);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (products && products.length > 0) {
      const categoryId = products[0].category_id;
      fetchCategory(categoryId);
    }
  }, [products]);

  const handleBuyNowClick = () => {
    Swal.fire({
      title: "Coming soon",
      text: "Coming soon in the next phase",
      icon: "info",
      confirmButtonText: "Ok",
    });
  };

  if (!products) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const toggleDescription = (mainCategoryId) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [mainCategoryId]: !expandedDescriptions[mainCategoryId],
    });
  };

  return (
    <div className="content grid1 mtop">
      <style>{`
        .blue-button {
          background-color: blue;
          color: white;
          border: none;
          margin-top: 10px;
          width: 100%;
        }

        .blue-button:hover {
          background-color: darkblue;
        }
        .man-pro {
          margin-bottom: 30px;
          border-bottom: 1px solid #e0e0e0;
        }
        .ent-quan {
          margin-top: 50px;
        }
      `}</style>
      {products.map((product) => {
        return (
          <div className="main-cont" key={product.id}>
            <div className="wrapper">
              <div className="product-img">
                <img
                  src={`http://127.0.0.1:8000/Storage/${
                    image ? image : product.image[0].image
                  }`}
                  alt=""
                />
              </div>
              <div className="product-info">
                <div className="product-text">
                  <h1>{product.name}</h1>
                  <h2>
                    {categoryData ? categoryData.name : "Loading category..."}
                  </h2>
                  <p>{product.description}</p>
                </div>
                <span className="price">
                  {product.price - product.discount_price}
                </span>
                $
                <div className="button flex">
                  <button onClick={handleBuyNowClick} className="man btn3">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UPDC;
