import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Swal from 'sweetalert2';
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import { MdOutlineDescription } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetailsCard = () => {

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
            navigate("/allproducts");
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
            <div className="box shadow" key={product.id}>
              <div className="img">
                <img
                  src={`http://127.0.0.1:8000/Storage/${
                  image ? image : product.image[0].image
                }`}
                  alt=""
                />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                      product.name === "Furniture"
                          ? "#25b5791a"
                          : "#ff98001a",
                      color:
                      product.name === "Electronics"
                          ? "#25b579"
                          : "#ff9800",
                    }}
                  >
                    {product.name}
                  </span>
                  <i className="fa fa-heart"></i>
                </div>
                <h4></h4>
                <p>
                <MdOutlineDescription />
                  Description:{" "}
                  {expandedDescriptions[product.id] ||
                  !product.description ||
                  product.description.length < 100
                    ? product.description
                    : `${product.description.slice(0, 100)}...`}{" "}
                  {product.description &&
                    product.description.length >= 100 &&
                    (expandedDescriptions[product.id] ? (
                      <span
                        onClick={() => toggleDescription(product.id)}
                        className="show-more"
                      >
                        {" "}
                        Show less
                      </span>
                    ) : (
                      <span
                        onClick={() => toggleDescription(product.id)}
                        className="show-more"
                      >
                        ... Show more
                      </span>
                    ))}
                </p>
              </div>  
              <div className='button flex'>
                    <button onClick={()=> handleEditProductClick()} className='btn3 edit' >
                      Edit 
                    </button>
                    <button onClick={()=> handleDelete()} className='btn3 delete'>
                      Delete
                    </button>
                  </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductDetailsCard;
