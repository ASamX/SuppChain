import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../../helper/Storage";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Heading from "../../common/Heading";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import "./SuppliersList.css";

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState(null);
  const { accessToken } = getAuthUser();
  const { suppliersId } = useParams();
  const navigate = useNavigate();
  const { userData } = getAuthUser(); // Get user data from local storage
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is not available.");
      return;
    }
    // Fetch suppliers
    fetch("http://127.0.0.1:8000/api/suppliers", {
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
      .then((data) => setSuppliers(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message);
      });
  }, [accessToken]);

  const handleDelete = (id) => {
    const deletedSupplier = suppliers.find((supplier) => supplier.id === id);

    // Display confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the delete action
        // Send a DELETE request to the API endpoint for deleting the supplier with the specified id
        fetch(`http://127.0.0.1:8000/api/suppliers/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting supplier");
            }
            // Remove the deleted supplier from the suppliers list
            setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
            Swal.fire(
              "Deleted!",
              `Your Supplier ${deletedSupplier.supplier_name} has been deleted.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting supplier:", error);
            alert("Error deleting supplier: " + error.message);
          });
      }
    });
  };

  const handleAddSupplierClick = () => {
    navigate(`/addsupplier`);
  };
  const handleShowSupplierClick = (id) => {
    navigate(`/supplier/${id}`);
  };
  const handleEditSupplierClick = (id) => {
    navigate(`/supplier/edit/${id}`);
  };

  if (!suppliers) {
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
      <section className="team background">
        <div className="team-container container">
          <Heading
            title="Our Suppliers"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          {!isFactoryAdmin && !isShopAdmin && (
            <button
              onClick={() => handleAddSupplierClick()}
              className="add-supplier btn1"
            >
              Add Supplier
            </button>
          )}
          <div className="content grid3">
            {suppliers.map((supplier) => (
              <div className="box">
                <div className="details">
                  <div className="img">
                    <img
                      src={`http://127.0.0.1:8000/Storage/${supplier.image}`}
                      alt=""
                    />
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  {/* <i className='fa fa-location-dot'></i> */}
                  <label>{supplier.supplier_email}</label>
                  <h4>{supplier.raw_materials}</h4>
                  <h4 className="supp-name">{supplier.supplier_name}</h4>
                  <div className="button flex">
                    {!isAdmin && !isShopAdmin && (
                      <button
                        onClick={() => handleShowSupplierClick(supplier.id)}
                        className="view btn3"
                      >
                        View
                      </button>
                    )}
                    {!isFactoryAdmin && !isShopAdmin && (
                      <button
                        onClick={() => handleEditSupplierClick(supplier.id)}
                        className="edit btn3"
                      >
                        Edit
                      </button>
                    )}
                    {!isFactoryAdmin && !isShopAdmin && (
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="delete btn3"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SuppliersList;
