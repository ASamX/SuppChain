import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import Swal from "sweetalert2";
import "./EditCategories.css";

const EditCategories = () => {
  const { categoryId } = useParams();
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [newImageURL, setNewImageURL] = useState(null);

  useEffect(() => {
    // Fetch data for the category to edit
    fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching category data");
        }
        return response.json();
      })
      .then((data) => {
        // Set the form data with the category information
        setFormData({
          name: data.name,
          description: data.description,
          image: data.image || null,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [categoryId, accessToken]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setNewImageURL(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    }

    fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating data");
        }
        return response.json();
      })
      .then((data) => {
        const updatedCategoryName = data.name;
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Category name '${updatedCategoryName}' has been updated!`,
        }).then(() => {
        navigate(-1); // Navigate back one step
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="contacttt-container">
      <div className="container">
        <div className="text">Edit Category</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <div className="underline"></div>
              <label htmlFor="name">Category Name</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <div className="underline"></div>
              <label htmlFor="description">Category Description</label>
            </div>
          </div>
          <div className="img-container form-row">
            <div className="mb-4">
              {(newImageURL || formData.image) && (
                <div
                  className="img-con"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={
                        newImageURL
                          ? newImageURL
                          : `http://127.0.0.1:8000/storage/${formData.image}`
                      }
                      alt={`Image ${formData.image}`}
                      className="img-thumbnail"
                      style={{ width: "350px", marginBottom: "10px" }}
                    />
                  </div>
                  <div className="image-related">
                    <div className="mb-4">
                      <input
                        type="file"
                        id="imageUpload"
                        onChange={handleImageChange}
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
              <button className="edit-product btn1">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategories;
