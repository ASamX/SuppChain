import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Guest_Admin_ShopAdmin_FactoryAdmin = () => {
  const { userData } = getAuthUser();
  return (
    <>
     {
      userData.user.role === 0 ||
      userData.user.role === 1 ||
      userData.user.role === 2 ||
      userData.user.role === 3 ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Guest_Admin_ShopAdmin_FactoryAdmin;
