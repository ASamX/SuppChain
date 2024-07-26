import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../../helper/Storage";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import "./ChildCategories.css";

const ChildCategoriesCard = () => {
  const { mainCategoryId } = useParams();
  const { accessToken } = getAuthUser();
  const [childCategories, setChildCategories] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true); // State variable for loading indicator
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an user
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is not available.");
      return;
    }
    // Fetch child categories based on the selected main category
    fetch(`http://127.0.0.1:8000/api/childCategories/${mainCategoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChildCategories(data);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
      })
      .catch((error) => {
        console.error("Error fetching child categories:", error);
        alert("Error fetching child categories: " + error.message);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
      });
  }, [accessToken, mainCategoryId]);

  const handleProductsByIdClick = (categoryId) => {
    navigate(`/products/childcategory/${categoryId}`);
  };

  const handleEditChildCategoryClick = (mainCategoryId) => {
    navigate(`/editCategory/${mainCategoryId}`);
  };

  const handleDeleteChildCategories = (categoryId, categoryName) => {
    Swal.fire({
      title: `Are you sure you want to delete ${categoryName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting category");
            }
            return response.json();
          })
          .then(() => {
            Swal.fire(
              "Deleted!",
              `Category ${categoryName} has been deleted.`,
              "success"
            );
            // Remove the deleted category from the state
            setChildCategories(
              childCategories.filter((category) => category.id !== categoryId)
            );
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            Swal.fire("Error!", "Failed to delete category.", "error");
          });
      }
    });
  };

  const toggleDescription = (childCategories) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [childCategories]: !expandedDescriptions[childCategories],
    });
  };

  if (!childCategories) {
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

  return (
    <>
      <div className="content grid3">
        {childCategories &&
          childCategories.map((childCategories) => {
            return (
              <div className="box">
                <div className="img">
                  <img
                    src={`http://127.0.0.1:8000/Storage/${childCategories.image}`}
                    alt=""
                  />
                </div>
                <div className="text">
                  <div className="category flex">
                    <span
                      style={{
                        background:
                          childCategories.name === "Chairs"
                            ? "#25b5791a"
                            : "#ff98001a",
                        color:
                          childCategories.name === "Beds"
                            ? "#25b579"
                            : "#ff9800",
                      }}
                    >
                      {childCategories.name}
                    </span>
                    <i className="fa fa-heart"></i>
                  </div>
                  <h4></h4>
                  <h4 className="desc">
                    <MdOutlineDescription />
                    Description:{" "}
                    {expandedDescriptions[childCategories.id] ||
                    !childCategories.description ||
                    childCategories.description.length < 100
                      ? childCategories.description
                      : `${childCategories.description.slice(0, 100)}...`}{" "}
                    {childCategories.description &&
                      childCategories.description.length >= 100 &&
                      (expandedDescriptions[childCategories.id] ? (
                        <span
                          onClick={() => toggleDescription(childCategories.id)}
                          className="show-more"
                        >
                          {" "}
                          Show less
                        </span>
                      ) : (
                        <span
                          onClick={() => toggleDescription(childCategories.id)}
                          className="show-more"
                        >
                          Show more
                        </span>
                      ))}
                  </h4>
                </div>
                <div className="button flex">
                {!isShopAdmin && !isFactoryAdmin && !isUser &&(
                  <button
                    onClick={() => handleProductsByIdClick(childCategories.id)}
                    className="btn3 view"
                  >
                    View
                  </button>
                )}
               {!isAdmin && (
                  <button
                    onClick={() => handleProductsByIdClick(childCategories.id)}
                    className="btn3 sf-view"
                  >
                    View
                  </button>
                )}
                  {!isShopAdmin && !isFactoryAdmin && !isUser && (
                    <button
                      onClick={() =>
                        handleEditChildCategoryClick(childCategories.id)
                      }
                      className="btn3 edit"
                    >
                      Edit
                    </button>
                  )}

                  {!isShopAdmin && !isFactoryAdmin && !isUser &&(
                    <button
                      onClick={() =>
                        handleDeleteChildCategories(childCategories.id)
                      }
                      className="btn3 delete"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChildCategoriesCard;
