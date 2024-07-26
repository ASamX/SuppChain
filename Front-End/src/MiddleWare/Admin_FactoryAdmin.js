import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Admin_FactoryAdmin = () => {
  const { userData } = getAuthUser();
  return userData && (userData.user.role === 1 || userData.user.role === 2) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default Admin_FactoryAdmin;
