import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import Warehouses from "../components/Warehouses/Warehouses";
import AddWarehouse from "../components/Warehouses/AddWarehouse";
import EditWarehouse from "../components/Warehouses/EditWarehouse";
import MainCategories from "../components/Categories/MainCategories/MainCategories";
import ChildCategories from "../components/Categories/ChildCatetories/ChildCatetories";
import AllProducts from "../components/Products/AllProducts/AllProducts";
import ProductsById from "../components/Products/ProductsById/ProductsById";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";
import Featured from "../components/home/featured/Featured";
import CreateMainCategory from "../components/Categories/MainCategories/CreateMainCategory";
import EditCategories from "../components/Categories/MainCategories/Editcategories";
import CreateChildCategory from "../components/Categories/ChildCatetories/CreateChildCategory";
import AddProduct from "../components/Products/ProductsById/AddProduct";
import EditProduct from "../components/Products/ProductsById/EditProduct";
import SupplierDetails from "../components/home/SuppliersList/SupplierDetails";
import AddSupplier from "../components/home/SuppliersList/AddSupplier";
import EditSupplier from "../components/home/SuppliersList/EditSupplier";
import SuppliersList from "../components/home/SuppliersList/SuppliersList";
import Sales from "../components/Sales/Sales";
import SalesDetails from "../components/Sales/SalesDetails";
import AllUsers from "../components/Users/Admins/AllUsers";
import AddAdmin from "../components/Users/Admins/AddAdmin";
import Dashboard from "../components/Dashboard/Dashboard";
import ProDetCard from "../components/Products/ProductDetails/ProDetCard";
import PDC from "../components/Products/ProductDetails/PDC";
import UPDC from "../components/UserProducts/UPDC";
import Hero from "../components/home/hero/Hero";
import ChildCategoriesCardTwo from "../Garbage/ChildCategoriesCardTwo";
import Guest from "../MiddleWare/Guest";
import Admin from "../MiddleWare/Admin";
import FactoryAdmin from "../MiddleWare/FactoryAdmin";
import ShopAdmin from "../MiddleWare/ShopAdmin";
import Admin_FactoryAdmin from "../MiddleWare/Admin_FactoryAdmin";
import Admin_ShopAdmin from "../MiddleWare/Admin_ShopAdmin";
import ShopAdmin_FactoryAdmin from "../MiddleWare/ShopAdmin_FactoryAdmin";
import Admin_ShopAdmin_FactoryAdmin from "../MiddleWare/Admin_ShopAdmin_FactoryAdmin";
import Guest_Admin_ShopAdmin_FactoryAdmin from "../MiddleWare/Guest_Admin_ShopAdmin_FactoryAdmin";
import SCH from "../components/schedules/SCH";
import MyAccount from "../components/Profile/MyAccount";
import EditProfile from "../components/Profile/EditProfile";
import ShopAdminWarehouses from "../components/Warehouses/ShopAdminWarehouses";
import RoleBasedRedirect from "./RoleBasedRedirect";
import UserProducts from "../components/UserProducts/UserProducts";
// import Features from "../usercomponents/Features";
// import UserProducts from "../usercomponents/Products";
// import ProductCategory from "../usercomponents/ProductCategory";
// import UPDC from "../usercomponents/ProductDetails";
// import UserHome from "../usercomponents/Home";
// import Home from "../components/home/Home";
// import RawMaterials from "../components/RawMaterials/RawMaterials";
// import Services from "../components/services/Services";
// import About from "../components/about/About";
// import Contact from "../components/contact/Contact";
// import Manufacture from "../components/Manufacture/Manufacture";


export const Router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RoleBasedRedirect />,
      },
      {
        path: "/Hero",
        element: <Hero />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <Guest_Admin_ShopAdmin_FactoryAdmin />,
        children: [
          {
            path: "/MyAccount",
            element: <MyAccount />,
          },
          {
            path: "/editProfile/:userId",
            element: <EditProfile />,
          },
          {
            path: "/product/:productId",
            element: <PDC />,
          },
          {
            path: "/maincategories",
            element: <MainCategories />,
          },
          {
            path: "/maincategories/childcategories/:mainCategoryId",
            element: <ChildCategories />,
          },
          {
            path: "/products/childcategory/:categoryId",
            element: <ProductsById />,
          },
        ],
      },
      {
        element: <Admin_ShopAdmin_FactoryAdmin />,
        children: [
          {
            path: "/allproducts",
            element: <AllProducts />,
          },
        ],
      },
      {
        element: <Admin_ShopAdmin />,
        children: [
          {
            path: "/warehouses",
            element: <Warehouses />,
          },
          {
            path: "/sales",
            element: <Sales />,
          },
          {
            path: "/salesdetails/:id",
            element: <SalesDetails />,
          },
        ],
      },
      {
        element: <Admin_FactoryAdmin />,
        children: [
          {
            path: "/SuppliersList",
            element: <SuppliersList />,
          },
        ],
      },
      {
        element: <ShopAdmin_FactoryAdmin />,
        children: [
          // {
          //   path: "/Manufacture",
          //   element: <Manufacture />,
          // },
        ],
      },
      {
        element: <Admin />,
        children: [
          {
            path: "/home",
            element: <Dashboard />,
          },
          {
            path: "/addproducts/childcategory/:categoryId",
            element: <AddProduct />,
          },
          {
            path: "/addwarehouse",
            element: <AddWarehouse />,
          },
          {
            path: "/warehouses/edit/:id",
            element: <EditWarehouse />,
          },
          {
            path: "/createmaincategory",
            element: <CreateMainCategory />,
          },
          {
            path: "/editCategory/:categoryId",
            element: <EditCategories />,
          },
          {
            path: "/createChildCategory/:categoryId",
            element: <CreateChildCategory />,
          },
          {
            path: "/Featured",
            element: <Featured />,
          },
          {
            path: "/Allusers",
            element: <AllUsers />,
          },
          {
            path: "/add-admin",
            element: <AddAdmin />,
          },
          { path: "/addsupplier", element: <AddSupplier /> },
          { path: "/supplier/edit/:id", element: <EditSupplier /> },
          { path: "/product/edit/:productId", element: <EditProduct /> },
        ],
      },
      {
        element: <FactoryAdmin />,
        children: [
          // {
          //   path: "/RawMaterials",
          //   element: <RawMaterials />,
          // }
          {
            path: "/supplier/:id",
            element: <SupplierDetails />,
          },
          {
            path: "/Schedules",
            element: <SCH />,
          },
        ],
      },
      {
        element: <ShopAdmin />,
        children: [
          {
            path: "/ShopAdminWarehouses",
            element: <ShopAdminWarehouses />,
          },
        ],
      },
      {
        element: <Guest />,
        children: [
          {
            path: "/UserProducts",
            element: <UserProducts />,
          },
          {
            path: "/products/:productId",
            element: <UPDC />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
