import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const ShopAdmin_FactoryAdmin = () => {
  const { userData } = getAuthUser();
  return userData && (userData.user.role === 2 || userData.user.role === 3) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default ShopAdmin_FactoryAdmin;
