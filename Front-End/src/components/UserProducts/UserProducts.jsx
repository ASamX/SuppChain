import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage"; // Import getAuthUser
import "./UserProducts.css";
import Swal from "sweetalert2";

const UserProducts = () => {
  const { userData } = getAuthUser(); // Get user data from local storage
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  const [products, setProducts] = useState(null);
  const [hoveredImage, setHoveredImage] = useState({});
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
    setHoveredImage({ ...hoveredImage, [productId]: imageUrl });
  };

  const handleLeaveImage = (productId) => {
    setHoveredImage({ ...hoveredImage, [productId]: null });
  };

  const navigateToProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleBuyNowClick = () => {
    Swal.fire({
      title: "Coming soon",
      text: "Coming soon in the next phase",
      icon: "info",
      confirmButtonText: "Ok",
    });
  };

  const calculateFinalPrice = (price, discountPrice) => {
    return price - discountPrice;
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="uscard-container">
      {products.map((product) => (
        <div key={product.id} className="uscard">
          <div className="imgBox">
            <img
              src={`http://127.0.0.1:8000/Storage/${
                hoveredImage[product.id]
                  ? hoveredImage[product.id]
                  : product.image[0].image
              }`}
              alt=""
              className="mouse"
              onMouseEnter={() =>
                handleHoverImage(product.id, product.image[0].image)
              }
              onMouseLeave={() => handleLeaveImage(product.id)}
            />
          </div>
          <div className="contentBox">
            <h3>{product.name}</h3>
            <h2 className="price">
              {product.discount_price ? (
                <span>
                  <del>{product.price}$</del>{" "}
                  {calculateFinalPrice(product.price, product.discount_price)}$
                </span>
              ) : (
                `${product.price}$`
              )}
              <small> </small>
            </h2>
            <Link
              to={`/products/${product.id}`}
              className="buy"
              onClick={() => navigateToProduct(product.id)}
            >
              More details
            </Link>
            <Link to="#" className="buy" onClick={() => handleBuyNowClick()}>
              Buy Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProducts;
