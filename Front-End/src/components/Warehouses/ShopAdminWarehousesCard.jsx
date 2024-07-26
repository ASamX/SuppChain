import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import CircularProgress from "@mui/material/CircularProgress";
import "../../Styles/CardsStyle.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./WarehousesCard.css";

const ShopAdminWarehousesCard = () => {
  const { accessToken } = getAuthUser();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is not available.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/sales/shopAdmin/shodAdminInfo", {
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
      })
      .finally(() => setLoading(false)); // Set loading to false after fetching data
  }, [accessToken]);

  const handleViewWarehousesClick = (mainCategoryId) => {
    navigate(`/salesdetails/${mainCategoryId}`);
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
      setLoading(false); // Ensure loading state is set to false even if an error occurs
    }
  };

  if (loading) {
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

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>No warehouses found for this admin.</p>
      </div>
    );
  }

  return (
    <div className="warehouses-card grid3">
      {data.map((item) => (
        <article className="card" key={item.id}>
          <img
            className="card__background"
            src={`http://127.0.0.1:8000/Storage/${item.image}`}
            alt="Warehouse image"
            width="1920"
            height="2193"
          />
          <div className="card__content flow">
            <div className="card__content--container flow">
              <h2 className="card__title">{item.shop_name}</h2>
              <h4 className="card__description">{item.address}</h4>
            </div>
            <div className="button flex">
              <button
                onClick={() => handleViewWarehousesClick(item.id)}
                className="btn3 sh-view"
              >
                View
              </button>
            </div>{" "}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ShopAdminWarehousesCard;
