import React from "react"
import Heading from "../../common/Heading"
import ProductsCard from "./ProductsCard"
import ProductsTable from "./ProductsTable"
import { getAuthUser } from "../../../helper/Storage"; // Import getAuthUser

import "../../../Styles/CardsStyle.css"

const AllProducts = () => {
  const { userData } = getAuthUser(); // Get user data from local storage
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  return (
    <>
      <section className='AllProducts padding'>
        <div className='container AllProducts '>
         <div className="AllProducts-heading">
          <Heading title='All Products' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          </div>
           {/* <button  className='add-product btn1'>
            Add Product
           </button> */}
            {!isFactoryAdmin && (
             <ProductsCard />
           )}
           {!isShopAdmin && !isAdmin &&(
            <ProductsTable />
           )}
         </div>
      </section>
    </>
  )
}

export default AllProducts
// onClick={()=> handleAddProductClick()}