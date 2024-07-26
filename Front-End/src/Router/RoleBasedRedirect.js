import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage"; // Adjust the import path accordingly


const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an admin
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin

  useEffect(() => {
    if (!userData) {
      navigate("/Hero");
      return;
    }
    if (isAdmin) {
      navigate("/home");
    } else if (isFactoryAdmin) {
      navigate("/Schedules");
    } else if (isShopAdmin) {
      navigate("/ShopAdminWarehouses");
    } else if (isUser) {
      navigate("/UserProducts");
    }
  }, [navigate, userData]);

  return null; // This component does not render anything itself
};

export default RoleBasedRedirect;
