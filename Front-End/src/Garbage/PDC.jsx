import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import Swal from "sweetalert2";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import CircularProgress from "@mui/material/CircularProgress";
import "./PDC.css"

const PDC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [image, setImage] = useState(null);
  const [categoryData, setCategoryData] = useState(null); // State to hold category data
  const { accessToken } = getAuthUser();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // State for toggling the form
  const [quantity, setQuantity] = useState(""); // State for quantity input
  const { userData } = getAuthUser(); // Get user data from local storage
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin

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
        console.log("Fetched product data:", data); // Log the product data

        setProducts(data);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products: " + error.message);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
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
        console.log("Fetched category data:", categoryData); // Log the category data
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
    setShowForm(!showForm); // Toggle the form visibility
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

      // Navigate back to the previous page after the request is sent successfully
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
                  </h2>{" "}
                  {/* Replace placeholder text with category name */}
                  <p>{product.description}</p>
                </div>
                <span className="price">{product.price}</span>$
                <div className="button flex">
                  {!isShopAdmin && !isFactoryAdmin && (
                    <button
                      onClick={handleEditProductClick}
                      className="edit btn3"
                    >
                      Edit
                    </button>
                  )}
                  {!isShopAdmin && !isFactoryAdmin && (
                    <button onClick={handleDelete} className="delete btn3">
                      Delete
                    </button>
                  )}
                  {!isAdmin && !isFactoryAdmin && (
                    <button
                      onClick={handleManufactureClick}
                      className="man btn3"
                    >
                      Manufacture
                    </button>
                  )}
                </div>
                {showForm && ( // Conditionally render the form
                  <div className="wwrap">
                    <Form className="ccounter">
                      <Row>
                        <Col>
                          <Form.Control
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <Button
                        onClick={handleRequestMaterials}
                        className="button"
                      >
                        Send manufacturing request
                      </Button>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PDC;
