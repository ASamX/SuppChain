import React from "react"
import Back from "../common/Back"
import MainCategoriesCard from "../Categories/MainCategories/MainCategoriesCard"
import "../Categories/MainCategories/MainCategories.css"
import img from "../images/about.jpg"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
        <div className='container recent'>
          <MainCategoriesCard />
        </div>
      </section>
    </>
  )
}

export default Blog
