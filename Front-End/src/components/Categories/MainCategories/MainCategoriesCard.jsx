// import React, { useState, useEffect } from "react";
// import { getAuthUser } from "../../../helper/Storage";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineDescription } from "react-icons/md";
// import CircularProgress from "@mui/material/CircularProgress";
// import Swal from "sweetalert2";

// const MainCategoriesCard = () => {
//   const { accessToken } = getAuthUser();
//   const [mainCategories, setMainCategories] = useState(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState(null);
//   const [childCategories, setChildCategories] = useState(null);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});
//   const [loading, setLoading] = useState(true); // State variable for loading indicator
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     if (!accessToken) {
//       console.error("Access token is not available.");
//       return;
//     }
//     setLoading(false); // Ensure loading state is set to false even if an error occurs

//     // Fetch main categories
//     fetch("http://127.0.0.1:8000/api/categories", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setMainCategories(data))
//       .catch((error) => {
//         console.error("Error fetching main categories:", error);
//         alert("Error fetching main categories: " + error.message);
//         setLoading(false); // Ensure loading state is set to false even if an error occurs
//       });
//   }, [accessToken]);

//   const handleMainCategoryClick = (mainCategoryId) => {
//     navigate(`/maincategories/childcategories/${mainCategoryId}`);
//   };
//   const handleEditMainCategoryClick = (mainCategoryId) => {
//     navigate(`/editCategory/${mainCategoryId}`);
//   };

//   const toggleDescription = (mainCategoryId) => {
//     setExpandedDescriptions({
//       ...expandedDescriptions,
//       [mainCategoryId]: !expandedDescriptions[mainCategoryId],
//     });
//   };

//   const handleDelete = (categoryId, categoryName) => {
//     Swal.fire({
//       title: `Are you sure you want to delete ${categoryName}?`,
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "red",
//       cancelButtonColor: "gray",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Error deleting category");
//             }
//             return response.json();
//           })
//           .then(() => {
//             Swal.fire(
//               "Deleted!",
//               `Category ${categoryName} has been deleted.`,
//               "success"
//             );
//             // Remove the deleted category from the state
//             setMainCategories(
//               mainCategories.filter((category) => category.id !== categoryId)
//             );
//           })
//           .catch((error) => {
//             console.error("Error deleting category:", error);
//             Swal.fire("Error!", "Failed to delete category.", "error");
//           });
//       }
//     });
//   };

//   if (!mainCategories) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </div>
//     )
//   }
//   return (
//     <>
//       <div className="content grid3">
//         {mainCategories.map((mainCategory) => {
//            return (
//           <div className="content grid1">
//             <div className="box shadow" key={mainCategory.id}>
//               <div className="img">
//                 <img
//                   src={`http://127.0.0.1:8000/Storage/${mainCategory.image}`}
//                   alt=""
//                 />
//               </div>
//               <div className="text">
//                 <div className="category flex">
//                   <span
//                     style={{
//                       background:
//                         mainCategory.name === "Furniture"
//                           ? "#25b5791a"
//                           : "#ff98001a",
//                       color:
//                         mainCategory.name === "Electronics"
//                           ? "#25b579"
//                           : "#ff9800",
//                     }}
//                   >
//                     {mainCategory.name}
//                   </span>
//                   <i className="fa fa-heart"></i>
//                 </div>
//                 <h4></h4>
//                 <p className="desc">
//                   {/* <i className="fa fa-location-dot"></i> */}
//                   <div className="text-type">
//                   <MdOutlineDescription />
//                   Description:{" "}
//                   </div>
//                   {expandedDescriptions[mainCategory.id] ||
//                   !mainCategory.description ||
//                   mainCategory.description.length < 100
//                     ? mainCategory.description
//                     : `${mainCategory.description.slice(0, 100)}...`}{" "}
//                   {mainCategory.description &&
//                     mainCategory.description.length >= 100 &&
//                     (expandedDescriptions[mainCategory.id] ? (
//                       <span
//                         onClick={() => toggleDescription(mainCategory.id)}
//                         className="show-more"
//                       >
//                         {" "}
//                         Show less
//                       </span>
//                     ) : (
//                       <span
//                         onClick={() => toggleDescription(mainCategory.id)}
//                         className="show-more"
//                       >
//                         ... Show more
//                       </span>
//                     ))}
//                 </p>
//               </div>
              // <div className='button flex'>
              //       <button onClick={() => handleMainCategoryClick(mainCategory.id)} className='btn3 view'>
              //         View
              //       </button>
              //       <button onClick={() => handleEditMainCategoryClick(mainCategory.id)} className='btn3 edit' >
              //         Edit
              //       </button>
              //       <button onClick={() => handleDelete(mainCategory.id)} className='btn3 delete'>
              //         Delete
              //       </button>
              //     </div>
//                    </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default MainCategoriesCard;


import '../../../Styles/CardsStyle.css'; // Assuming you have a separate CSS file for styles
import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../../helper/Storage";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

function MainCategoriesCard() {

  const { accessToken } = getAuthUser();
  const [mainCategories, setMainCategories] = useState(null);
  const [loading, setLoading] = useState(true); // State variable for loading indicator
  const navigate = useNavigate();
  const { userData } = getAuthUser(); // Get user data from local storage
  const isUser = userData && userData.user.role === 0; // Check if the user is an user
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin
  
  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is not available.");
      return;
    }
    setLoading(false); // Ensure loading state is set to false even if an error occurs

    // Fetch main categories
    fetch("http://127.0.0.1:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMainCategories(data))
      .catch((error) => {
        console.error("Error fetching main categories:", error);
        alert("Error fetching main categories: " + error.message);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
      });
  }, [accessToken]);

  const handleMainCategoryClick = (mainCategoryId) => {
    navigate(`/maincategories/childcategories/${mainCategoryId}`);
  };
  const handleEditMainCategoryClick = (mainCategoryId) => {
    navigate(`/editCategory/${mainCategoryId}`);
  };

  const handleDelete = (categoryId, categoryName) => {
    Swal.fire({
      title: `Are you sure you want to delete ${categoryName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting category");
            }
            return response.json();
          })
          .then(() => {
            Swal.fire(
              "Deleted!",
              `Category ${categoryName} has been deleted.`,
              "success"
            );
            // Remove the deleted category from the state
            setMainCategories(
              mainCategories.filter((category) => category.id !== categoryId)
            );
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            Swal.fire("Error!", "Failed to delete category.", "error");
          });
      }
    });
  };

  if (!mainCategories) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="ag-format-container">
      <div className="ag-courses_box">
        {mainCategories.map((mainCategory) => (
          <div key={mainCategory.id} className="ag-courses_item">
             <div className="category-image">
                  <img src={`http://127.0.0.1:8000/Storage/${mainCategory.image}`} alt='' />
            </div>
            <Link to={`/maincategories/childcategories/${mainCategory.id}`} className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_content">
                <div className="category-info">
                  <div className="ag-courses-item_title">
                    {mainCategory.name}
                  </div>
                  <div className="ag-courses-item_date-box">
                    Description:{" "}
                    <span className="ag-courses-item_date">
                      {mainCategory.description}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            {!isShopAdmin && !isFactoryAdmin && !isUser && (
            <div className='button flex'>
                    <button onClick={() => handleMainCategoryClick(mainCategory.id)} className='view btn3'>
                      View
                    </button>
                    <button onClick={() => handleEditMainCategoryClick(mainCategory.id)} className='edit btn3' >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(mainCategory.id)} className='delete btn3'>
                      Delete
                    </button>
                  </div>
                                                               )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default MainCategoriesCard;



