import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { logout, getAuthUser} from "../../../helper/Storage.jsx";
import SearchBox from "../../SearchBox/SearchBox.jsx";
import ProfileIcon from "../../Profile/ProfileIcon.jsx";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useHistory from react-router-dom

const Header = () => {
  const navigate = useNavigate();
  const [navList, setNavList] = useState(false);


  const handleLogout = () => {
    logout();
    console.log("Logged out");
    navigate("/Login");
  };

  return (
    <>
      <header className='main-header header'>
        <div className='header-container container flex'>
          <div className='logo'>
            <Link to={"/Home"} className="logo-title">SuppChain</Link>
          </div>
          <div className="search-box">
            <SearchBox/>
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className='button flex'>
            {getAuthUser() ? ( 
              <button onClick={handleLogout} className='logout-btn btn1'>
                Logout
              </button>
            ) : (
              <button onClick={() => navigate("/Login")} className='sign-in-btn btn1'>
                <i className='fa fa-sign-in'></i> Sign In
              </button>
            )}
          </div> */}
          <div className="profile-icon">
            <ProfileIcon/>
          </div>
          {/* <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
