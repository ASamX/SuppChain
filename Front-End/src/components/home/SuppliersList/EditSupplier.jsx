import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import Swal from "sweetalert2";

const EditSupplier = () => {
  const { id } = useParams();
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplier_name: "",
    supplier_email: "",
    raw_materials: "",
    phone: "",
    image: null,
    imageUrl: null, // Add imageUrl property
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          supplier_name: data.supplier_name,
          supplier_email: data.supplier_email,
          raw_materials: data.raw_materials,
          phone: data.phone,
          image: data.image || null,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id, accessToken]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imageUrl: URL.createObjectURL(file), // Set imageUrl for the preview
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("supplier_name", formData.supplier_name);
    formDataWithImage.append("supplier_email", formData.supplier_email);
    formDataWithImage.append("raw_materials", formData.raw_materials);
    formDataWithImage.append("phone", formData.phone);
    formDataWithImage.append("image", formData.image);

    fetch(`http://127.0.0.1:8000/api/suppliers/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formDataWithImage,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating data");
        }
        return response.json();
      })
      .then(() => {
        Swal.fire(
          "Success!",
          `Supplier ${formData.supplier_name} updated successfully.`,
          "success"
        );
        navigate("/SuppliersList");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="contacttt-container">
      <div className="container">
        <div className="text">Edit Supplier {id}</div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="supplier_name"
                name="supplier_name"
                value={formData.supplier_name}
                onChange={handleInputChange}
              />
              <div className="underline"></div>
              <label htmlFor="supplier_name">Supplier Name</label>
            </div>
            <div className="input-data">
              <input
                type="email"
                className="form-control"
                id="supplier_email"
                name="supplier_email"
                value={formData.supplier_email}
                onChange={handleInputChange}
              />
              <div className="underline"></div>
              <label htmlFor="supplier_email">Supplier Email</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="raw_materials"
                name="raw_materials"
                value={formData.raw_materials}
                onChange={handleInputChange}
              />
              <div className="underline"></div>
              <label htmlFor="raw_materials">Raw Materials</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <div className="underline"></div>
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className="img-container form-row">
            <div className="mb-4">
              {(formData.imageUrl || formData.image) && (
                <div className="supp-img-con">
                  <div>
                    <img
                      src={
                        formData.imageUrl
                          ? formData.imageUrl
                          : `http://127.0.0.1:8000/storage/${formData.image}`
                      }
                      alt={`Supplier Image ${id}`}
                      className="img-thumbnail"
                      style={{ width: "350px", marginBottom: "10px" }}
                    />
                  </div>
                  <div className="image-related">
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        onChange={handleFileChange}
                        className="anything"
                      />
                    </div>
                    <div className="inner"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <button type="submit" className="edit-product btn1">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplier;
