import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../../helper/Storage";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import "./ProductsCard.css"

const ProductsCard = () => {
  const [products, setProducts] = useState(null);
  const [hoveredImage, setHoveredImage] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/product`);
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products: " + error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleHoverImage = (productId, imageUrl) => {
    setHoveredImage({ [productId]: imageUrl });
  };

  const handleLeaveImage = (productId) => {
    setHoveredImage({ [productId]: null });
  };

  const handleProductDetailsClick = (productId) => {
    navigate(`/product/${productId}`);
  };  


  if (!products) {
    return <div>Loading...</div>;
  }

  const toggleDescription = (mainCategoryId) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [mainCategoryId]: !expandedDescriptions[mainCategoryId],
    });
  };
  
  return (
    <div className="content grid3">
      {products.map((product) => {
        return (
          <div className="center">
            <div className="property-card">
              <a onClick={() => handleProductDetailsClick(product.id)}>
                <div className="property-image">
                  <img
                    src={`http://127.0.0.1:8000/Storage/${
                      hoveredImage[product.id]
                        ? hoveredImage[product.id]
                        : product.image[0].image
                    }`}
                    alt=""
                  />
                  <div className="property-image-title">
                    {/* <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. --> */}
                  </div>
                </div>
              </a>
              <div className="property-description">
                <h1 className='card-title'>{product.name}</h1>
              </div>
              <a href="#">
                <div className="property-social-icons">
                  {/* <!-- I would usually put multiple divs inside here set to flex. Some people might use Ul li. Multiple Solutions --> */}
                </div>
              </a>
            </div>
          </div>
        );
      })}
  </div>
   );
  }
  export default ProductsCard;