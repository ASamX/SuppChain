import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import "./Sales.css"; // Use the same CSS file as ProductsTable

const Sales = () => {
  const { accessToken } = getAuthUser();
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [selectedShop, setSelectedShop] = useState("");
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
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error fetching products: ${error.message}`,
        });
      }
    };

    fetchProducts();

    const fetchShops = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/sales/shopAdmin/shodAdminInfo`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching shops");
        }
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error("Error fetching shops:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error fetching shops: ${error.message}`,
        });
      }
    };

    fetchShops();
  }, [accessToken]);

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

  const handleAddToSales = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (productId, value) => {
    setQuantity({ ...quantity, [productId]: value });
  };

  const handleShopChange = (e) => {
    setSelectedShop(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity[selectedProduct.id] || !selectedShop) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill in all fields",
      });
      return;
    }

    const data = {
      quantity: quantity[selectedProduct.id],
      shop_id: selectedShop,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/sales/shopAdmin/product_id/${selectedProduct.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding to sales");
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added to sales successfully",
      });
      setShowModal(false);
      setSelectedProduct(null);
      setQuantity({});
      setSelectedShop("");
    } catch (error) {
      console.error("Error adding to sales:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Error adding to sales: ${error.message}`,
      });
    }
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
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
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
                <td>
                  <button className="sales-button" onClick={() => handleAddToSales(product)}>Add to Sales</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add to Sales</h5>
              <button className="close" onClick={handleModalClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    className="form-controler"
                    id="quantity"
                    value={quantity[selectedProduct?.id] || ""}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(selectedProduct?.id, e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shop">Shop:</label>
                  <select
                    className="form-control"
                    id="shop"
                    value={selectedShop}
                    onChange={handleShopChange}
                    required
                  >
                    <option value="">Select a shop</option>
                    {shops.map((shop) => (
                      <option key={shop.id} value={shop.id}>
                        ID:{shop.id}-{shop.shop_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sales;
