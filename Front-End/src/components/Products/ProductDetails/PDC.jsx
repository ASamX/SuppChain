import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import CircularProgress from "@mui/material/CircularProgress";
import "./PDC.css";

const PDC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [image, setImage] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const { accessToken } = getAuthUser();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const { userData } = getAuthUser();
  const isUser = userData && userData.user.role === 0;
  const isAdmin = userData && userData.user.role === 1;
  const isFactoryAdmin = userData && userData.user.role === 2;
  const isShopAdmin = userData && userData.user.role === 3;

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
            Swal.fire(
              "Oops! Something went wrong while deleting the product!",
              {
                icon: "error",
              }
            );
          });
      } else {
        Swal.fire("Your product is safe!");
      }
    });
  };

  const handleEditProductClick = () => {
    navigate(`/product/edit/${productId}`);
  };

  const handleManufactureClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleRequestMaterials = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/schedule/product_id/${productId}`,
        {
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Request sent!", {
        icon: "success",
      });

      navigate(-1);
    } catch (error) {
      console.error("Error sending request:", error);
      Swal.fire("Error sending request: " + error.message, {
        icon: "error",
      });
    }
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
  .popup-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 30px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 8px;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .blue-button {
    background-color: blue;
    color: white;
    border: none;
    margin-top:10px;
    width: 100%
  }

  .button-close {
    background-color: red;
    color: white;
    border: none;
    margin-left:280px;
    margin-bottom:30px;
  }
  .blue-button:hover {
    background-color: darkblue;
  }
  .button-close:hover {
    background-color: darkred;
  }
  .man-pro{
    margin-bottom: 30px;
      border-bottom: 1px solid #e0e0e0; /* Add gray line under each text element */

  }
  .ent-quan{
    margin-top:50px;
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
                  <p>Quantity : {product.quantity}</p>
                </div>
                <span className="price">
                  {product.price - product.discount_price}
                </span>
                $
                <div className="button flex">
                  {!isShopAdmin && !isFactoryAdmin && !isUser && (
                    <button
                      onClick={handleEditProductClick}
                      className="edit btn3"
                    >
                      Edit
                    </button>
                  )}
                  {!isShopAdmin && !isFactoryAdmin && !isUser && (
                    <button onClick={handleDelete} className="delete btn3">
                      Delete
                    </button>
                  )}
                  {!isAdmin && !isFactoryAdmin && !isUser && (
                    <button
                      onClick={handleManufactureClick}
                      className="man btn3"
                    >
                      Manufacture
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <Button
              variant="secondary"
              onClick={handleCloseForm}
              className="button-close me-2"
            >
              X
            </Button>
            <h3 className="man-pro">Manufacture Product</h3>
            <p className="ent-quan">Enter the quantity</p>
            <Form>
              <Form.Group as={Row}>
                <Col sm="12">
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      border: "2px solid #4a90e2",
                      borderRadius: "6px",
                      padding: "8px",
                      width: "100%", // Set width to 100%
                      marginTop: "20px", // Set margin top to 20px
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  onClick={handleRequestMaterials}
                  className="blue-button"
                >
                  Send Request
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDC;
