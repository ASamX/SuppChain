import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

const MyAccount = () => {
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/user-profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditProfile = () => {
    navigate(`/editProfile/${user.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "110px",
        marginLeft: "180px",
        height: "600px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={`http://127.0.0.1:8000/storage/${user.image}`}
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
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
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
                marginTop: "50px",
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
        </form>
        <button
          onClick={handleEditProfile}
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
            marginTop: "10px",
            marginLeft: "60px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "black")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
