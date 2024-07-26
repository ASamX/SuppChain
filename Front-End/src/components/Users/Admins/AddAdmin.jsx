import React, { useState } from "react";
import Swal from "sweetalert2";
import { getAuthUser } from "../../../helper/Storage";
import { useNavigate } from "react-router-dom";
import "./AddAdmin.css";

const AddAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 1, // Default role
    image: null, // Initialize image as null for file input
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }
    const { accessToken } = getAuthUser(); // Retrieve the access token
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("image", formData.image); // Append the image file

    // Post data to API with access token included in the header
    fetch("http://127.0.0.1:8000/api/addAdmin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email is already taken!",
            });
          } else {
            throw new Error("Failed to add admin");
          }
        }
        return response.json();
      })
      .then((data) => {
        const userId = data.user.id; // Retrieve the user ID from the response data

        if (!userId) {
          throw new Error("User ID not found in response data");
        }

        // If admin is created successfully, upload the image
        const formDataToSend = new FormData();
        formDataToSend.append("image", formData.image);

        fetch(`http://127.0.0.1:8000/api/addImage/${userId}`, {
          // Use userId in the URL
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to upload image");
            }
            // If image is uploaded successfully
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Admin added successfully!",
            }).then(() => {
              // Navigate to the desired page
              navigate("/allusers");
            });
          })
          .catch((error) => {
            console.error("Failed to upload image:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to upload image",
            });
          });
      })
      .catch((error) => {
        console.error("Failed to add admin:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add admin",
        });
      });
  };

  return (
    <div className="contact-container">
      <style>
        {`
        
.form-row {
  display: flex;
  justify-content: space-between;
}

.input-data {
  position: relative;
  width: 48%;
}

.input-data input,
.input-data select {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #aaa;
  background-color: transparent;
  outline: none;
  font-size: 16px;
  color: #fff; /* Change text color to white */
}

.input-data select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
}

.input-data label {
  position: absolute;
  top: 10px;
  left: 10px;
  pointer-events: none;
  transition: 0.3s;
  font-size: 16px;
  color: #fff; /* Change label color to white */
}

.input-data input:focus ~ label,
.input-data select:focus ~ label,
.input-data input:not(:placeholder-shown) ~ label,
.input-data select:not(:placeholder-shown) ~ label {
  top: -10px; /* Adjusted top value */
  left: 0;
  font-size: 12px;
  color: #fff; /* Change focused label color to white */
}

.input-data .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff; /* Change underline color to white */
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-out;
}

.input-data input:focus ~ .underline,
.input-data select:focus ~ .underline {
  transform: scaleX(1);
  transform-origin: left;
}

.input-data-file {
  position: relative;
  width: 48%;
  margin-bottom: 20px;
}

.input-data-file input[type="file"] {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 16px;
  color: #fff; /* Change text color to white */
}

.input-data-file .underline {
  display: none; /* Hide underline for file input */
}

.add-supplier.btn1 {
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 200px;
}

.add-supplier.btn1:hover {
  background-color: #555;
}
        `}
      </style>
      <div className="container">
        <div className="text">Add Admin</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: e.target.value,
                  }))
                }
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-data">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: e.target.value,
                  }))
                }
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    password: e.target.value,
                  }))
                }
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-data">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    confirmPassword: e.target.value,
                  }))
                }
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    role: e.target.value,
                  }))
                }
                className="form-control"
                required
              >
                <option style={{ color: "black" }} value={1}>
                  Role 1 : Super Admin
                </option>
                <option style={{ color: "black" }} value={2}>
                  Role 2 : Factory Admin
                </option>
                <option style={{ color: "black" }} value={3}>
                  Role 3 : Shop Admin
                </option>
              </select>
              <div className="underline"></div>
              <label htmlFor="role">Role</label>
            </div>
            <div className="input-data-file">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="anything"
              />
            </div>
          </div>
          <button className="add-supplier btn1">Add Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
