import React, { useState } from "react";
import { getAuthUser } from "../../../helper/Storage";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import "./AddProduct.css"

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [active, setActive] = useState(true);
  const [images, setImages] = useState([]);
  const [rawMaterialName, setRawMaterialName] = useState(""); // New field
  const [rawMaterialQuantityKg, setRawMaterialQuantityKg] = useState(""); // New field
  const { categoryId } = useParams();
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      parseFloat(price) < 0 ||
      parseFloat(discountPrice) < 0 ||
      parseInt(quantity) < 0 ||
      parseFloat(rawMaterialQuantityKg) < 0 // Check for negative values in new field
    ) {
      alert("Price, Discount Price, Quantity, and Raw Material Quantity cannot be negative.");
      return;
    }

    if (images.length > 4) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can upload a maximum of 4 images.",
      });
      return;
    }

    // Proceed with form submission
    try {
      const productResponse = await fetch(
        `http://127.0.0.1:8000/api/FactoryAdminProduct/childCategory_id/${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name,
            description,
            price,
            discount_price: discountPrice,
            quantity,
            active,
            raw_material_name: rawMaterialName, // Include new field
            raw_material_quantity_kg: rawMaterialQuantityKg // Include new field
          }),
        }
      );

      if (!productResponse.ok) {
        throw new Error("Failed to add product");
      }

      const productData = await productResponse.json();
      const productId = productData.id;

      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        const imageUploadResponse = await fetch(
          `http://127.0.0.1:8000/api/FactoryAdminProductImage/product/${productId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        if (!imageUploadResponse.ok) {
          throw new Error("Failed to upload image");
        }
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added successfully!",
      }).then(() => {
        navigate(`/products/childcategory/${categoryId}`);
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array

    if (images.length + selectedFiles.length > 4) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can upload a maximum of 4 images.",
      });
      return;
    }

    setImages([...images, ...selectedFiles]);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="contactt-container">
      <div className="container">
        <div className="text">
          Add Product
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="name">Product Name</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="description">Description</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                required
                min="0"
              />
              <div className="underline"></div>
              <label htmlFor="price">Price</label>
            </div>
            <div className="input-data">
              <input
                type="number"
                id="discountPrice"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="form-control"
                required
                min="0"
              />
              <div className="underline"></div>
              <label htmlFor="discountPrice">Discount Price</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
            <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                required
                min="0"
                disabled // Disable the input field
              />
              <div className="underline"></div>
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                id="rawMaterialName"
                value={rawMaterialName}
                onChange={(e) => setRawMaterialName(e.target.value)}
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="rawMaterialName">Raw Material Name</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="number"
                id="rawMaterialQuantityKg"
                value={rawMaterialQuantityKg}
                onChange={(e) => setRawMaterialQuantityKg(e.target.value)}
                className="form-control"
                required
                min="0"
              />
              <div className="underline"></div>
              <label htmlFor="rawMaterialQuantityKg">Raw Material Quantity (kg)</label>
            </div>
            <div className="checkbox-container">
              <label htmlFor="active" className="checkbox-label">
                Active
              </label>
              <input
                type="checkbox"
                id="active"
                checked={!active}
                onChange={(e) => setActive(e.target.checked)}
                className="checkbox-field"
                disabled // Disable the checkbox
              />
            </div>
          </div>
          <div className="form-row">
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="anything"
            />
          </div>
          <div className="image-preview-container">
            {images.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product ${index + 1}`}
                  className="image-preview"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="delete-image-button"
                >
                  Delete Image
                </button>
              </div>
            ))}
          </div>
          <div className="input-data">
            <div className="inner"></div>
            <button className='add-warehouse btn1' type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
