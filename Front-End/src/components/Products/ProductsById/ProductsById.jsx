import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading"
import ProductsByIdCard from "./ProductsByIdCard"
// import "../../../Styles/CardsStyle.css"
// import "../../../Styles/MainStyles.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";


const ProductsById = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an admin
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  const handleAddProductClick = () => {
     navigate(`/addproducts/childcategory/${categoryId}`);
  };
  return (
    <>
      <section className='ProductsById padding'>
        <div className='container ProductsById'>
          <div className="products-by-id-heading">
          <Heading title="Products" subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          </div>
          {!isShopAdmin && !isFactoryAdmin && !isUser &&(
          <button onClick={()=> handleAddProductClick()} className='add-product btn1'>
            Add Product
          </button>
          )}
          <ProductsByIdCard/>
        </div>
      </section>
    </>
  )
}

export default ProductsById;
