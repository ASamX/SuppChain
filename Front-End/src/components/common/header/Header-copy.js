import React from "react";
import { Link } from "react-router-dom";
import light_logo from "../../../assets/w-logo.png";
import dark_logo from "../../../assets/b-logo.png";
import search_icon_light from "../../../assets/search-w.png";
import search_icon_dark from "../../../assets/search-b.png";
import toggle_light from "../../../assets/night.png";
import toggle_dark from "../../../assets/day.png";
import { FaSearch, FaUserCircle } from "react-icons/fa";
// import LogoutButton from "../Auth/Logout"; // Adjust the import path accordingly
import "./Header-copy.css";

const Header = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className={`header-container ${theme}`}>
      <Link to="/">
        <img
          src={theme === "light" ? dark_logo : light_logo}
          alt=""
          className="logo"
        />
      </Link>

      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt=""
        />
      </div>
      <img
        onClick={() => {
          toggle_mode();
        }}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
      <div className="profile">
        <FaUserCircle />
      </div>
      {/* <LogoutButton /> */}
    </div>
  );
};

export default Header;
