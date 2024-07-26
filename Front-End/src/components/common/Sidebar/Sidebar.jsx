import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWarehouse,
  faTags,
  faShoppingCart,
  faIndustry,
  faUsers,
  faCircleInfo,
  faEnvelope,
  faList,
  faTruckField,
  faBox, // Import the new icon for raw materials
  faCalendarAlt,
  faChartLine,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAuthUser } from "../../../helper/Storage"; // Import getAuthUser
import "./Sidebar.css";

const Sidebar = ({ theme, setTheme }) => {
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an admin
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin

  return (
    <aside className={`sidebar-container ${theme}`}>
      <div className="sidebar-content">
        <Link to="/MyAccount" className="nav-link">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span>My Account</span>
        </Link>
        {!isAdmin && !isShopAdmin && !isUser && (
          <Link to="/Schedules" className="nav-link">
            <FontAwesomeIcon icon={faListCheck} className="icon" />
            <span>Requests</span>
          </Link>
        )}
        {!isShopAdmin && !isFactoryAdmin && !isUser && (
          <Link to="/home" className="nav-link">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Home</span>
          </Link>
        )}
        {!isFactoryAdmin && !isShopAdmin && !isUser && (
          <Link to="/Warehouses" className="nav-link">
            <FontAwesomeIcon icon={faWarehouse} className="icon" />
            <span>Warehouses</span>
          </Link>
        )}
        {!isFactoryAdmin && !isAdmin && !isUser && (
          <Link to="/shopadminwarehouses" className="nav-link">
            <FontAwesomeIcon icon={faWarehouse} className="icon" />
            <span>My Shops</span>
          </Link>
        )}
        {!isFactoryAdmin && !isAdmin && !isUser && (
          <Link to="/Sales" className="nav-link">
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <span>Salse</span>
          </Link>
        )}
        {
          <Link to="/MainCategories" className="nav-link">
            <FontAwesomeIcon icon={faTags} className="icon" />
            <span>Main Categories</span>
          </Link>
        }
        {!isUser && (
          <Link to="/AllProducts" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            <span>Products</span>
          </Link>
        )}
        {/* {!isAdmin && ( // Render only if the user is an admin
          <Link to="/Manufacture" className="nav-link">
            <FontAwesomeIcon icon={faIndustry} className="icon" />
            <span>Manufacture</span>
          </Link>
        )} */}
        {!isShopAdmin && !isUser && (
          <Link to="/SuppliersList" className="nav-link">
            <FontAwesomeIcon icon={faTruckField} className="icon" />
            <span>Suppliers</span>
          </Link>
        )}
        {!isFactoryAdmin && !isShopAdmin && !isUser && (
          <Link to="/allusers" className="nav-link">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <span>All users</span>
          </Link>
        )}
        {!isAdmin && !isShopAdmin && !isFactoryAdmin && (
          <Link to="/UserProducts" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            <span>ِAll products</span>
          </Link>
        )}
        {/* {!isAdmin && !isShopAdmin && (
          <Link to="/RawMaterials" className="nav-link">
            <FontAwesomeIcon icon={faBox} className="icon" />
            <span>Raw Materials</span>
          </Link>
        )} */}
        {/* <Link to="/about" className="nav-link">
          <FontAwesomeIcon icon={faCircleInfo} className="icon" />
          <span>About</span>
        </Link>
        <Link to="/contact" className="nav-link">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span>Contact Us</span>
        </Link>
        <Link to="/services" className="nav-link">
          <FontAwesomeIcon icon={faList} className="icon" />
          <span>Services</span>
        </Link> */}
      </div>
    </aside>
  );
};

export default Sidebar;
