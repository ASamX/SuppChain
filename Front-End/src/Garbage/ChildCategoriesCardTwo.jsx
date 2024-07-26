import React, { useState, useEffect } from "react";
import { getAuthUser } from "../helper/Storage";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import "./ChildCategoriesCardTwo.css"

const Articles = () => {

  const { mainCategoryId } = useParams();
  const { accessToken } = getAuthUser();
  const [childCategories, setChildCategories] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true); // State variable for loading indicator

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
       setChildCategories(data)
       setLoading(false); // Ensure loading state is set to false even if an error occurs
      })
      .catch((error) => {
        console.error("Error fetching child categories:", error);
        alert("Error fetching child categories: " + error.message);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
      });
  }, [accessToken, mainCategoryId]);
  
  const toggleDescription = (childCategories) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [childCategories]: !expandedDescriptions[childCategories],
    });
  };

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

  return (
    <section className="articles">
  {childCategories && childCategories.map((childCategory) => {
    return (
      <article key={childCategory.id}>
        <div className="article-wrapper">
          <figure>
            <img src={`http://127.0.0.1:8000/Storage/${childCategory.image}`} alt="" />
          </figure>
          <div className="article-body">
            <h2>{childCategory.name}</h2>
            <p>
                <MdOutlineDescription/>
                  Description:{" "}
                  {expandedDescriptions[childCategory.id] ||
                  !childCategory.description ||
                  childCategory.description.length < 100
                    ? childCategory.description
                    : `${childCategory.description.slice(0, 100)}...`}{" "}
                  {childCategory.description &&
                    childCategory.description.length >= 100 &&
                    (expandedDescriptions[childCategory.id] ? (
                      <span
                        onClick={() => toggleDescription(childCategory.id)}
                        className="show-more"
                      >
                        {" "}
                        Show less
                      </span>
                    ) : (
                      <span
                        onClick={() => toggleDescription(childCategory.id)}
                        className="show-more"
                      >
                        ... Show more
                      </span>
                    ))}
                </p>
          </div>
        </div>
        <div className='button flex'>
          <button onClick={() => handleProductsByIdClick(childCategory.id)} className='btn3 view'>
            View
          </button>
          <button onClick={() => handleEditChildCategoryClick(childCategory.id)} className='btn3 edit' >
            Edit
          </button>
          <button onClick={() => handleDeleteChildCategories(childCategory.id)} className='btn3 delete'>
            Delete 
          </button>
        </div>
      </article>
    )
  })}
</section>

  );
}

export default Articles;
