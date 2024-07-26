import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuthUser } from "../../../helper/Storage";
import "./AddSupplier.css";

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    supplier_name: "",
    supplier_email: "",
    raw_materials: "",
    phone: "",
    image: null,
  });

  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("supplier_name", formData.supplier_name);
    formDataWithImage.append("supplier_email", formData.supplier_email);
    formDataWithImage.append("raw_materials", formData.raw_materials);
    formDataWithImage.append("phone", formData.phone);
    formDataWithImage.append("image", formData.image);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/suppliers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataWithImage,
      });

      if (!response.ok) {
        throw new Error("Error adding supplier");
      }

      const data = await response.json();
      Swal.fire(
        "Success!",
        `Supplier "${data.supplier_name}" added successfully.`,
        "success"
      );
      navigate("/SuppliersList"); // Navigate to suppliers list page
    } catch (error) {
      console.error("Error adding supplier:", error);
      Swal.fire("Error!", "Failed to add supplier.", "error");
    }
  };

  return (
    <div className="contact-container">
      <div className="container">
        <div className="text">
          Add Supplier
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                id="supplier_name"
                name="supplier_name"
                value={formData.supplier_name}
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="supplier_name">Supplier Name</label>
            </div>
            <div className="input-data">
              <input
                type="email"
                id="supplier_email"
                name="supplier_email"
                value={formData.supplier_email}
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="supplier_email">Supplier Email</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <select
                id="raw_materials"
                name="raw_materials"
                value={formData.raw_materials}
                onChange={handleChange}
                className="form-select"
                required
              >
            <option value="">Select Raw Material</option>
            <option value="">Select Raw Material</option>
            <option value="Wood">Wood</option>
            <option value="Metal">Metal</option>
            <option value="Plastic">Plastic</option>
            <option value="Cotton">Cotton</option>
            <option value="Rattan">Rattan</option>
            <option value="Fabric">Fabric</option>
            <option value="Leather">Leather</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Diamond">Diamond</option>
            <option value="Aluminum">Aluminum</option>
            <option value="Cork">Cork</option>
            <option value="Copper">Copper</option>
            <option value="Rubber">Rubber</option>
            <option value="Stainless Steel">Stainless Steel</option>
              </select>
              <div className="underline"></div>
              <label htmlFor="raw_materials">Raw Materials</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="underline"></div>
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className="form-row">
            <div className="mb-4">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="anything"
              />
            </div>
            <div className="input-data">
              <div className="inner"></div>
              <button className='add-supplier btn1'>
                Add Supplier
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
