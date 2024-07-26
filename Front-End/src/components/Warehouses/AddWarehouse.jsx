  /* eslint-disable react-hooks/exhaustive-deps */
  import React, { useState, useEffect } from "react";
  import { getAuthUser } from "../../helper/Storage";
  import Swal from "sweetalert2"; // Import SweetAlert
  import { useNavigate } from "react-router-dom";
  // import "./AddWarehouse.css"

  const AddWarehouse = () => {
    const [shopName, setShopName] = useState("");
    const [address, setAddress] = useState("");
    const [shopAdminId, setShopAdminId] = useState("");
    const [image, setImage] = useState(null); // State to hold the image file
    const [users, setUsers] = useState([]);
    const { accessToken } = getAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/allUsers", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        const filteredUsers = data.filter((user) => user.role === 3);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users: " + error.message);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("shop_name", shopName);
      formData.append("address", address);
      formData.append("shopAdmin_id", shopAdminId);
      formData.append("image", image); // Append the image file to the form data

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/shopInfo/superAdmin",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add warehouse");
        }

        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Warehouse created successfully!",
        }).then(() => {
          // Navigate to "/warehouses"
          navigate("/warehouses");
        });
      } catch (error) {
        console.error("Error adding warehouse:", error);
        alert("Error adding warehouse: " + error.message);
      }
    };
    return (
      <div className="contact-container">
        <div className="container">
          <div className="text">
            Add Warehouses Form
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-data">
                <input  type="text"
                  id="shopName"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="form-control"
                  required />
                <div className="underline"></div>
                <label htmlFor="">Shop Name</label>
              </div>
              <div className="input-data">
                <input type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  required />
                <div className="underline"></div>
                <label htmlFor="">Address</label>
              </div>
            </div>
            <div className="form-row">
            <select
              id="shopAdminId"
              value={shopAdminId}
              onChange={(e) => setShopAdminId(e.target.value)}
              className="dropdown input-data"
            >
            <option value="" className="option">Select Shop Admin</option>
            {users.map((user) => (
              <option className="option" key={user.id} value={user.id}>
              ID: {user.id}, Name: {user.name}
              </option>
            ))}
            </select>   
            <div className="mb-4">
              {/* <label className="form-label" htmlFor="image">
                Image:
              </label> */}
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="anything"
              />
            </div>
                <div className="input-data">
                  <div className="inner"></div>
                  <button className='add-warehouse btn1'>
                      Add Warehouse
                  </button>
                </div>
              </div>
          </form>
        </div>
      </div>
    );
  };

  export default AddWarehouse;




    // return (
    //   <section className="intro">
    //     <div className="bg-image h-100">
    //       <div
    //         className="mask d-flex align-items-center h-100"
    //         style={{ backgroundColor: "#f3f2f2" }}
    //       >
    //         <div className="container">
    //           <div className="row d-flex justify-content-center align-items-center">
    //             <div className="col-12 col-lg-9 col-xl-8">
    //               <div className="card" style={{ borderRadius: "1rem" }}>
    //                 <div className="row g-0">
    //                   <div className="col-md-8 d-flex align-items-center">
    //                     <div className="card-body py-5 px-4 p-md-5">
    //                       <form onSubmit={handleSubmit}>
    //                         <h4
    //                           className="fw-bold mb-4"
    //                           style={{ color: "#92aad0" }}
    //                         >
    //                           Add Warehouse
    //                         </h4>
    //                         <div className="mb-4">
    //                           <label className="form-label" htmlFor="shopName">
    //                             Shop Name:
    //                           </label>
    //                           <input
    //                             type="text"
    //                             id="shopName"
    //                             value={shopName}
    //                             onChange={(e) => setShopName(e.target.value)}
    //                             className="form-control"
    //                           />
    //                         </div>

    //                         <div className="mb-4">
    //                           <label className="form-label" htmlFor="address">
    //                             Address:
    //                           </label>
    //                           <input
    //                             type="text"
    //                             id="address"
    //                             value={address}
    //                             onChange={(e) => setAddress(e.target.value)}
    //                             className="form-control"
    //                           />
    //                         </div>

    //                         <div className="mb-4">
    //                           <label className="form-label" htmlFor="shopAdminId">
    //                             Shop Admin ID:
    //                           </label>
    //                           <select
    //                             id="shopAdminId"
    //                             value={shopAdminId}
    //                             onChange={(e) => setShopAdminId(e.target.value)}
    //                             className="form-control"
    //                           >
    //                             <option value="">Select Shop Admin</option>
    //                             {users.map((user) => (
    //                               <option key={user.id} value={user.id}>
    //                                 ID: {user.id}, Name: {user.name}
    //                               </option>
    //                             ))}
    //                           </select>
    //                         </div>

    //                         {/* Input field for file upload */}
    //                         <div className="mb-4">
    //                           <label className="form-label" htmlFor="image">
    //                             Image:
    //                           </label>
    //                           <input
    //                             type="file"
    //                             id="image"
    //                             accept="image/*"
    //                             onChange={(e) => setImage(e.target.files[0])}
    //                             className="form-control"
    //                           />
    //                         </div>

    //                         <button
    //                           type="submit"
    //                           className="btn btn-primary btn-rounded"
    //                           style={{ backgroundColor: "#92aad0" }}
    //                         >
    //                           Add Warehouse
    //                         </button>
    //                       </form>
    //                     </div>
    //                   </div>
    //                   <div className="col-md-4 d-none d-md-block">
    //                     <img
    //                       src="https://mdbootstrap.com/img/Photos/Others/sidenav2.jpg"
    //                       alt="login form"
    //                       className="img-fluid"
    //                       style={{
    //                         borderTopRightRadius: "1rem",
    //                         borderBottomRightRadius: "1rem",
    //                         height: "100%",
    //                       }}
    //                     />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // );