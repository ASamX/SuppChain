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
      const tblContent = document.querySelector(".tbl-content");
      if (tblContent) {
        const scrollWidth = tblContent.offsetWidth - tblContent.scrollWidth;
        const tblHeader = document.querySelector(".tbl-header");
        if (tblHeader) {
          tblHeader.style.paddingRight = `${scrollWidth}px`;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the padding

    return () => {
      window.removeEventListener("resize", handleResize);
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
    <section className="prod-table">
      <style>{`
        /* Sales.css */

/* Add styles for the modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-title {
  margin: 0;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-controler {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-control:focus, .form-controler:focus {
  border-color: #007bff;
  outline: none;
}

button[type="submit"] {
  background: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #0056b3;
}

.quantitycolor {
color:black}

/* Custom styles for the select shop dropdown */
#shop {
  appearance: none;
  background: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658c-.73-.885-.07-2.106 1.03-2.106h9.038c1.1 0 1.76 1.221 1.03 2.106l-4.796 5.482c-.588.673-1.471.673-2.058 0z"/></svg>') no-repeat right 10px center;
  padding-right: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#shop option {
  padding: 10px;
}

        `}</style>
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
                  <button
                    className="sales-button"
                    onClick={() => handleAddToSales(product)}
                  >
                    Add to Sales
                  </button>
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
                  <label htmlFor="quantity" className="quantitycolor">
                    Quantity:
                  </label>
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
