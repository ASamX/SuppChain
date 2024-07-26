import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./ProfileIcon.css";
import { logout, getAuthUser } from "../../helper/Storage.jsx";

function ProfileIcon() {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { accessToken } = getAuthUser();
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/user-profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setProfileImage(data.image); // Assuming the image key is 'image'
        setProfileName(data.name); // Assuming the name key is 'name'
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [accessToken]);

  const handleLogout = () => {
    logout();
    console.log("Logged out");
    navigate("/Login");
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`profile ${showMenu ? "clicked" : ""}`}
      ref={profileRef}
      onClick={() => {
        setShowMenu(!showMenu);
      }}
    >
      {!profileImage && !showMenu && (
        <div className="profile-placeholder"></div>
      )}
      {profileImage && (
        <img
          src={`http://127.0.0.1:8000/storage/${profileImage}`}
          alt="Profile"
          className="profile-img"
        />
      )}
      {!profileImage && showMenu && (
        <div className="profile-placeholder-empty"></div>
      )}
      {accessToken && showMenu && (
        <div className="dropdown-menu">
          <div className="hi-admin">Hi {profileName}!</div>
          <Link className="my-account" to="/myaccount">
            Profile
          </Link>
          <div className="dropdown-item" onClick={handleLogout}>
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
