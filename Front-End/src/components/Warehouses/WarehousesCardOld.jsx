import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom"; // Import Link component
import Swal from "sweetalert2";
import { MdOutlineDescription } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const WarehousesCard = () => {
  const navigate = useNavigate();
  const { accessToken } = getAuthUser();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  const [data, setData] = useState(null);

  useEffect(() => {
    // Check if the access token is available
    if (!accessToken) {
      console.error("Access token is not available.");
      // You may want to handle this case, for example, redirect the user to the login page
      return;
    }
    setLoading(false); // Ensure loading state is set to false even if an error occurs

    fetch("http://127.0.0.1:8000/api/shopInfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message);
      });
  }, [accessToken]);

  const handleViewWarehousesClick = (mainCategoryId) => {
    // navigate(`/maincategories/childcategories/${mainCategoryId}`);
  };

  const handleEditWarehousesClick = (mainCategoryId) => {
    navigate(`/warehouses/edit/${mainCategoryId}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/shopInfo/superAdmin/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete warehouse");
        }

        // Remove the deleted warehouse from the local data state
        setData((prevData) => prevData.filter((item) => item.id !== id));

        Swal.fire("Deleted!", "Your warehouse has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      alert("Error deleting warehouse: " + error.message);
      setLoading(false); // Ensure loading state is set to false even if an error occurs
    }
  };

  if (!data) {
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
    )
  }

  const toggleDescription = (Id) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [Id]: !expandedDescriptions[Id],
    });
  };
  // Render your JSX content with Card components
  return (
    <>
      <div className="content grid3 mleft">
      {data.map((item) => {
          return (
            <div className="content grid1 mleft">
            <div className="box shadow" key={item.id}>
              <div className="img">
                <img
                  src={`http://127.0.0.1:8000/Storage/${item.image}`}
                  alt=""
                />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                      item.shop_name === "Furniture"
                          ? "#25b5791a"
                          : "#ff98001a",
                      color:
                      item.shop_name === "Electronics"
                          ? "#25b579"
                          : "#ff9800",
                    }}
                  >
                    {item.shop_name}
                  </span>
                  <i className="fa fa-heart"></i>
                </div>
                <h4></h4>
                <p>
                  <i className="fa fa-location-dot"></i>
                  {" "}Location:{" "}
                  {expandedDescriptions[item.id] ||
                  !item.address ||
                  item.address.length < 10
                    ? item.address
                    : `${item.address.slice(0, 10)}...`}{" "}
                  {item.address &&
                    item.address.length >= 10 &&
                    (expandedDescriptions[item.id] ? (
                      <span
                        onClick={() => toggleDescription(item.id)}
                        className="show-more"
                      >
                        {" "}
                        Show less
                      </span>
                    ) : (
                      <span
                        onClick={() => toggleDescription(item.id)}
                        className="show-more"
                      >
                        ... Show more
                      </span>
                    ))}
                </p>
              </div>
              <div className='button flex'>
                    <button onClick={() => handleViewWarehousesClick(item.id)} className='btn3 view'>
                      View
                    </button>
                    <button onClick={()=> handleEditWarehousesClick(item.id)} className='btn3 edit' >
                      Edit
                    </button>
                    <button onClick={()=> handleDelete(item.id)} className='btn3 delete'>
                      Delete
                    </button>
                  </div>
                  </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WarehousesCard;
