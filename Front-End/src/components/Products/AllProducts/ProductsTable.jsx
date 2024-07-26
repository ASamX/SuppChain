import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductsTable.css"; // Assuming you save the CSS in ProductsTable.css

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const handleResize = () => {
      const tblContent = document.querySelector('.tbl-content');
      if (tblContent) {
        const scrollWidth = tblContent.offsetWidth - tblContent.scrollWidth;
        const tblHeader = document.querySelector('.tbl-header');
        if (tblHeader) {
          tblHeader.style.paddingRight = `${scrollWidth}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the padding

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleProductDetailsClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className='prod-table'>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Raw material</th>
              <th>Raw material quantity (KG)</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {products.map((product) => (
              <tr key={product.id} onClick={() => handleProductDetailsClick(product.id)}>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/Storage/${product.image[0].image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.raw_material_name}</td>
                <td>{product.raw_material_quantity_kg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductsTable;
