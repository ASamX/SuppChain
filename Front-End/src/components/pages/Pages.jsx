import React from "react";
import Header from "../common/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../common/footer/Footer";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Sidebar from "../common/Sidebar/Sidebar";
import { getAuthUser } from "../../helper/Storage"; // Import getAuthUser

const Pages = () => {
  const location = useLocation();
  const isLoginOrRegister =
  location.pathname === "/Hero" || location.pathname === "/hero" || location.pathname === "/Login" ||  location.pathname === "/login" || location.pathname === "/Register" || location.pathname === "/register" || location.pathname === "/";
  const isHome = location.pathname === "/" || location.pathname === "/Home";
  const isMainCategories = location.pathname === "/MainCategories";
  const isLogin = location.pathname === "/Login";
  const isDashboard = location.pathname === "/Dashboard";
  const { userData } = getAuthUser(); // Get user data from local storage

  return (
    <>
     {userData && !isLoginOrRegister && <Header />}
        <div className="content">
          {userData && !isLoginOrRegister && <Sidebar />}
          <div className="main-content"> {/* Conditionally set the marginLeft */}
            <Outlet />
            {/* {isHome && <Footer />} */}
          </div>
        </div>
    </>
  );
};

export default Pages;


// style={{marginTop: !isLoginOrRegister ? "80px" : 0, marginLeft: isMainCategories ? "2%"  : isLoginOrRegister ? "-12.5%" : "6%", marginRight:  isLoginOrRegister ? "-12.5%" : isDashboard ? "-12.5%" :  "0%" }} 