import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const FactoryAdmin = () => {
  const { userData } = getAuthUser(); // Get user data from local storage
  return (
    <>
      {userData && userData.user.role === 2 ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default FactoryAdmin;
