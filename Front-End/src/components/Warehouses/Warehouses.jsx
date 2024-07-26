import React from "react"
import Heading from "../common/Heading"
// import WarehousesCard from "./WarehousesCard"
import "../../Styles/CardsStyle.css"
import "../../Styles/MainStyles.css"
import { useNavigate } from "react-router-dom";
import WarehousesCard from "./WarehousesCard"
const Warehouses = () => {
  const navigate = useNavigate();

  const handleAddWarehousesClick = () => {
     navigate(`/AddWarehouse`);
  };
  return (
    <>
      <section className='warehouses padding'>
        <div className='container warehouses'>
          <Heading className='head' title='Warehouses' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          <button onClick={()=> handleAddWarehousesClick()} className='add-warehouse btn1'>
            Add Warehouse
          </button>
            <WarehousesCard />
        </div>
      </section>
    </>
  )
}

export default Warehouses;


//Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.