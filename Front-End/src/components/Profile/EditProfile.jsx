import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuthUser } from "../../helper/Storage";

const EditProfile = () => {
  const { userId } = useParams();
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    imageFile: null,
    password: "",
    image: "", // field to store the image from the database
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/auth/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser({
          name: response.data.name,
          email: response.data.email,
          imageFile: null,
          password: "",
          image: response.data.image
            ? `http://127.0.0.1:8000/storage/${response.data.image}`
            : "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      imageFile: file,
      image: URL.createObjectURL(file),
    }));
  };

  const handleChangePassword = () => {
    Swal.fire({
      title: "Enter New Password",
      input: "password",
      inputPlaceholder: "Enter your new password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Change",
      showLoaderOnConfirm: true,
      preConfirm: (newPassword) => {
        setUser((prevUser) => ({ ...prevUser, password: newPassword }));
      },
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: "swal-popup-style",
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);

    if (user.password) {
      formData.append("password", user.password);
    }

    if (user.imageFile) {
      formData.append("image", user.imageFile);
    }

    // Debugging: Log the formData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      if (!user.image) {
        // No image indicates no image is present, call addImage API
        const addImageResponse = await axios.post(
          `http://127.0.0.1:8000/api/addImage/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Add image response data:", addImageResponse.data);
      } else {
        const editProfileResponse = await axios.post(
          `http://127.0.0.1:8000/api/editProfile/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Edit profile response data:", editProfileResponse.data);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been successfully updated.",
      }).then(() => {
        navigate(`/login`);
      });
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error updating your profile. Please try again.",
      });
    }
  };

  // CSS for the Swal input field
  const swalPopupStyle = `
  .swal-popup-style {
    left: 5.89% !important;
    // transform: translateX(-50%);
  }
`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
        marginLeft: "180px",
        height: "620px",
      }}
    >
      <div
        style={{
          width: "500px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <style>{swalPopupStyle}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={user.image || "default-profile-image.jpg"}
            alt="Profile"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <h2>{user.name}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleInputChange}
              style={{
                border: "none",
                backgroundColor: "#F5F5F5",
                padding: "5px 10px",
                width: "350px",
                height: "50px",
                fontSize: "large",
                borderRadius: "5px",
                marginTop: "10px",
                marginLeft: "15px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              disabled
              style={{
                border: "none",
                backgroundColor: "#F5F5F5",
                padding: "5px 10px",
                width: "350px",
                height: "50px",
                fontSize: "large",
                borderRadius: "5px",
                marginLeft: "20px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <button
              type="button"
              onClick={handleChangePassword}
              style={{
                backgroundColor: "#add8e6", // Baby blue color
                color: "white",
                padding: "5px 10px",
                width: "350px",
                height: "50px",
                fontSize: "large",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                marginLeft: "60px", // Slightly adjusted to the right
                marginTop: "10px", // Match margin of name field
                transition: "background-color 0.3s", // Smooth hover effect
              }}
              onMouseOver={
                (e) => (e.currentTarget.style.backgroundColor = "#87ceeb") // Light blue color on hover
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#add8e6")
              }
            >
              Change Password
            </button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="image">Profile Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              style={{
                padding: "5px 10px",
                width: "300px",
                height: "50px",
                fontSize: "large",
                borderRadius: "5px",
                marginLeft: "-20px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px 10px",
              width: "350px",
              height: "50px",
              fontSize: "large",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginLeft: "60px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
