import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import Swal from "sweetalert2";
import "./EditWarehouse.css";

const EditWarehouse = () => {
  const { id } = useParams();
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [shopAdminId, setShopAdminId] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [newImageURL, setNewImageURL] = useState(null);

  useEffect(() => {
    fetchWarehouseData();
    fetchUsers();
  }, [id, accessToken]);

  const fetchWarehouseData = () => {
    fetch(`http://127.0.0.1:8000/api/shopInfo/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching warehouse data");
        }
        return response.json();
      })
      .then((data) => {
        setShopName(data.shop_name);
        setAddress(data.address);
        setShopAdminId(data.shopAdmin_id);
        setNewImageURL(
          data.image ? `http://127.0.0.1:8000/storage/${data.image}` : null
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const fetchUsers = () => {
    fetch("http://127.0.0.1:8000/api/allUsers", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching users data");
        }
        return response.json();
      })
      .then((data) => {
        const filteredUsers = data.filter((user) => user.role === 3);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setNewImageURL(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("shop_name", shopName);
    formData.append("address", address);
    formData.append("shopAdmin_id", shopAdminId);
    if (image) {
      formData.append("image", image);
    }

    fetch(`http://127.0.0.1:8000/api/shopInfo/superAdmin/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Error updating data");
          });
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Warehouse name '${data.shop_name}' has been updated!`,
        }).then(() => {
          navigate("/warehouses");
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="contacttt-container">
      <div className="container">
        <div className="text">Edit Warehouse</div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="shop_name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="shop_name">Warehouse Name</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="address">Address</label>
            </div>
          </div>
          <div className="form-row">
            <select
              id="shopAdmin_id"
              value={shopAdminId}
              onChange={(e) => setShopAdminId(e.target.value)}
              className="dropdown input-data"
              style={{ color: "white" }} // Style applied to the select element itself
            >
              <option value="">Select Shop Admin</option>
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  style={{ color: "black" }}
                >
                  {" "}
                  {/* Style applied to each option */}
                  ID: {user.id}, Name: {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="img-container form-row">
            <div className="mb-4">
              {newImageURL && (
                <div className="img-con">
                  <img
                    src={newImageURL}
                    alt="New"
                    className="img-thumbnail"
                    style={{ width: "350px", marginBottom: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="form-row">
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              className="anything"
            />
          </div>
          <div className="form-row">
            <div className="input-data">
              <button className="edit-product btn1">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWarehouse;
