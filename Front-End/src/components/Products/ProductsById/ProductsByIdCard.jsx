import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import './ProductsByIdCard.css'; 
import { getAuthUser } from "../../../helper/Storage";

const ProductsByIdCard = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState(null);
  const [hoveredImage, setHoveredImage] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userData } = getAuthUser();
  const isUser = userData && userData.user.role === 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(
          `http://127.0.0.1:8000/api/product/childCategory_id/${categoryId}`
        );
        if (!productsResponse.ok) {
          throw new Error("Error fetching products");
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products: " + error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleHoverImage = (productId, imageUrl) => {
    setHoveredImage({ [productId]: imageUrl });
  };

  const handleLeaveImage = (productId) => {
    setHoveredImage({ [productId]: null });
  };

  const toggleDescription = (childCategories) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [childCategories]: !expandedDescriptions[childCategories],
    });
  };

  const handleProductDetailsClick = (productId) => {
    navigate(`/product/${productId}`);
  };  

  const handleProductDetailsClickForUser = (productId) => {
    navigate(`/products/${productId}`);
  };  

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="content grid3">
      {products.map((product) => {
        return (
          <div className="center" key={product.id}>
            <div className="property-card" onClick={() => isUser ? handleProductDetailsClickForUser(product.id) : handleProductDetailsClick(product.id)}>
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
              <div className="property-description">
                <h1 className='card-title'>{product.name}</h1>
              </div>
              <div className="property-social-icons">
                {/* <!-- I would usually put multiple divs inside here set to flex. Some people might use Ul li. Multiple Solutions --> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsByIdCard;
