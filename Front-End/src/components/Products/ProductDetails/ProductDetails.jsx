import React from "react"
import Heading from "../../common/Heading"
import ProductDetailsCard from "./ProductDetailsCard"
import "../../../Styles/CardsStyle.css"

const ProductDetails = () => {
  return (
    <>
      <section className='ProductDetails padding'>
        <div className='container ProductDetails'>
          <Heading title='Product details' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          <ProductDetailsCard />
        </div>
      </section>
    </>
  )
}

export default ProductDetails;
