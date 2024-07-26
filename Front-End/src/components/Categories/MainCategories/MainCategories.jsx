import React from "react"
import Heading from "../../common/Heading"
import MainCategoriesCard from "./MainCategoriesCard.jsx"
import "../../../Styles/CardsStyle.css"
import "../../../Styles/MainStyles.css"
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";

const MainCategories = () => {
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an user
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  
  const navigate = useNavigate();
  const handleAddWarehousesClick = () => {
    navigate(`/createmaincategory`);
 };
  return (
    <>
      <section className='MainCategories padding'>
        <div className='container MainCategories'>
          <Heading title='Main Categories' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          {!isShopAdmin && !isFactoryAdmin && !isUser &&(

          <button onClick={()=> handleAddWarehousesClick()} className='add-main-cat btn1'>
            Add Main category
          </button> 

)}
          <MainCategoriesCard />
        </div>
      </section>
    </>
  )
}

export default MainCategories
