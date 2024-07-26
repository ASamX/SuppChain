/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import { getAuthUser } from "../../../helper/Storage";
import "./EditProduct.css";

function EditProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [active, setActive] = useState(false);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();
  const { accessToken } = getAuthUser();

  useEffect(() => {
    // Fetch product details
    axios
      .get(`http://127.0.0.1:8000/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          const productData = res.data[0];
          const { name, description, price, quantity, discount_price, active } =
            productData;
          setName(name);
          setDescription(description);
          setPrice(parseFloat(price));
          setQuantity(parseInt(quantity, 10));
          setDiscountPrice(parseFloat(discount_price));
          setActive(Boolean(active));
        } else {
          console.error("No product data received");
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });

    // Fetch images associated with the product
    axios
      .get(
        `http://127.0.0.1:8000/api/FactoryAdminProductImage/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setImages(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product images:", error);
      });
  }, [productId, accessToken]);

  const handleActiveToggle = () => {
    setActive((prevActive) => !prevActive);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length + newImages.length > 4) {
      Swal.fire({
        icon: "error",
        title: "Exceeded Image Limit",
        text: "You can upload a maximum of 4 images.",
      });
      return;
    }
    setNewImages((prevNewImages) => [...prevNewImages, ...files]);
  };

  const handleImageDelete = (imgId) => {
    setImages(images.filter((image) => image.id !== imgId));
    axios
      .delete(`http://127.0.0.1:8000/api/FactoryAdminProductImage/${imgId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Image Deleted",
          text: "Image has been deleted successfully!",
        });
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Delete Image",
          text: "An error occurred while deleting the image. Please try again later.",
        });
      });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/FactoryAdminProduct/${productId}`,
        {
          name,
          description,
          price,
          quantity,
          discount_price: discountPrice,
          active,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle image uploads after product details are updated
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((file) => {
          formData.append("image", file);
        });
        await axios.post(
          `http://127.0.0.1:8000/api/FactoryAdminProductImage/product/${productId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "Product has been updated successfully!",
      });
      navigate(-1); // Navigate back one step
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Product",
        text: "An error occurred while updating the product. Please try again later.",
      });
    }
  };

  return (
    <div className="contacttt-container">
      <div className="container">
        <div className="text">Edit Product</div>
        <form onSubmit={formSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="productDescription"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="description">Description</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                id="productPrice"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="price">Price</label>
            </div>
            <div className="input-data">
              <input
                type="number"
                min="0"
                className="form-control"
                id="productQuantity"
                placeholder="Product Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="quantity">Quantity</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                id="productDiscountPrice"
                placeholder="Product Discount Price"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
              <div className="underline"></div>
              <label htmlFor="discount_price">Discount Price</label>
            </div>
            <div className="input-data">
              <label htmlFor="active">Active:</label>
              <input
                className="form-check-input"
                type="checkbox"
                id="productActive"
                checked={active}
                onChange={handleActiveToggle}
              />
            </div>
          </div>
          <div className="img-container form-row">
            <div className="mb-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="img-con"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={`http://127.0.0.1:8000/storage/${image.image}`}
                      alt={`Image ${image.id}`}
                      className="img-thumbnail"
                      style={{ width: "350px", marginBottom: "10px" }}
                    />
                  </div>
                  <div className="image-related">
                    <button
                      className="delete-image btn1"
                      onClick={() => handleImageDelete(image.id)}
                    >
                      Delete image
                    </button>
                  </div>
                </div>
              ))}
              {newImages.map((image, index) => (
                <div
                  key={index}
                  className="img-con"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`New Image ${index}`}
                      className="img-thumbnail"
                      style={{ width: "350px", marginBottom: "10px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageUpload}
                multiple
                className="anything"
              />
            </div>
          </div>
          <div className="form-row ">
            <div className="input-data">
              <div className="inner"></div>
              <button className="edit-product btn1">Update Product</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
