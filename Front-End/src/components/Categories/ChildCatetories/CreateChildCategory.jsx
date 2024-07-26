import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuthUser } from "../../../helper/Storage";

const CreateChildCategory = () => {
  const { categoryId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const { accessToken } = getAuthUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/childCategories/${categoryId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Error adding child category");
      }

      const data = await response.json();
      Swal.fire(
        "Success!",
        `Child category "${data.name}" added successfully.`,
        "success"
      );
      navigate(`/mainCategories/childCategories/${categoryId}`); // Go back to previous page after successful addition
    } catch (error) {
      Swal.fire("Error!", "Failed to add child category.", "error");
    }
  };

  return (
    <div className="contact-container">
      <div className="container">
        <div className="text">
        Add Child Category
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input  
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required />
              <div className="underline"></div>
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-data">
              <input 
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required />
              <div className="underline"></div>
              <label htmlFor="description">Description</label>
            </div>
          </div>
          <div className="form-row">
            <div className="mb-4">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="anything"
              />
            </div>
            <div className="input-data">
              <div className="inner"></div>
              <button className='add-main-categories btn1'>
                Add Child Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChildCategory;
