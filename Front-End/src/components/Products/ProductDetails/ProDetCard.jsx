import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Swal from 'sweetalert2';
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import { MdOutlineDescription } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import './ProDetCard.css';

function ProDetCard() {

    const navigate = useNavigate();
    const { productId } = useParams();
    const [products, setProducts] = useState(null);
    const [image, setImage] = useState(null);
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
  
          setProducts(data);
          setLoading(false); // Ensure loading state is set to false even if an error occurs
        } catch (error) {
          console.error("Error fetching products:", error);
          alert("Error fetching products: " + error.message);
          setLoading(false); // Ensure loading state is set to false even if an error occurs
  
        }
      };
  
      fetchProducts();
    }, [productId, accessToken]);
  
    const handleDelete = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://127.0.0.1:8000/api/FactoryAdminProduct/${productId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then(() => {
              Swal.fire("Poof! Your product has been deleted!", {
                icon: "success",
              });
              navigate("/products");
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
              Swal.fire("Oops! Something went wrong while deleting the product!", {
                icon: "error",
              });
            });
        } else {
          Swal.fire("Your product is safe!");
        }
      });
    };
    const handleEditProductClick = () => {
      navigate(`/product/edit/${productId}`);
    };
  
    if (!products) {
      return(
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
      )
    }
  
    const toggleDescription = (mainCategoryId) => {
      setExpandedDescriptions({
        ...expandedDescriptions,
        [mainCategoryId]: !expandedDescriptions[mainCategoryId],
      });
    };


  return (
    <>
    <div className="content grid1 mtop">
      {products.map((product) => {
        return (
    <div className="prodet-card">
      <div className="left">
      <img
                  src={`http://127.0.0.1:8000/Storage/${
                  image ? image : product.image[0].image
                }`}
                  alt=""
                />
        <i className="fa fa-long-arrow-left"></i>
        <i className="fa fa-long-arrow-right"></i>
      </div>
      <div className="right">
        <div className="product-info">
          <div className="product-name">
          </div>
          <div className="details">
            <h3>{}</h3>
            <h2>{product.name}</h2>
            <h4>{product.description}</h4>
          </div>
          <ul>
            <li>SIZE</li>
            <li className="bg">7</li>
            <li className="bg">8</li>
            <li className="bg">9</li>
            <li className="bg">10</li>
            <li className="bg">11</li>
          </ul>
          <ul>
            <li>COLOR</li>
            <li className="yellow"></li>
            <li className="black"></li>
            <li className="blue"></li>
          </ul>
          <span className="foot"><i className="fa fa-shopping-bag"></i>Buy Now</span>
          <span className="foot"><i className="fa fa-shopping-cart"></i>Add TO Cart</span>
        </div>
      </div>
    </div>
              );
            })}
          </div>
        </>
  );
}

export default ProDetCard;
