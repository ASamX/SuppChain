import React from "react"
import Heading from "../common/Heading"
// import WarehousesCard from "./WarehousesCard"
import "../../Styles/CardsStyle.css"
import "../../Styles/MainStyles.css"
import { useNavigate } from "react-router-dom";
import "./WarehousesCard.css";
import ShopAdminWarehousesCard from "./ShopAdminWarehousesCard";

const ShopAdminWarehouses = () => {
  const navigate = useNavigate();

  const handleAddWarehousesClick = () => {
     navigate(`/AddWarehouse`);
  };
  return (
    <>
      <section className='warehouses padding'>
        <div className='container warehouses'>
          <Heading className='head' title='My Shops' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
            <ShopAdminWarehousesCard/>
        </div>
      </section>
    </>
  )
}

export default ShopAdminWarehouses;


//Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.