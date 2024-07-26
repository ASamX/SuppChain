import React from "react"
import Heading from "../../common/Heading"
import ChildCategoriesCard from "./ChildCategoriesCard"
import "./ChildCategories.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";

const ChildCategories = () => {
  const { mainCategoryId } = useParams();
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an user
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  const navigate = useNavigate();
  const handleAddChildCategoryClick = () => {
    navigate(`/createChildCategory/${mainCategoryId}`);
 };

  return (
    <>
      <section className='ChildCategories padding'>
        <div className='ChildCategories container'>
          <Heading className="head" title='Child Categories' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          {!isShopAdmin && !isFactoryAdmin && !isUser && (
          <button onClick={()=> handleAddChildCategoryClick()} className='add-child-cat btn1'>
            Add Child category
          </button> 
          )}
          <ChildCategoriesCard />
        </div>
      </section>
    </>
  )
}

export default ChildCategories;
