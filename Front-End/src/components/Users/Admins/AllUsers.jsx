// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";
// import { getAuthUser } from "../../../helper/Storage";
// import { Link } from "react-router-dom";
// import "./AllUsers.css"
// import { useNavigate } from "react-router-dom";

// const AllUsers = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [sorting, setSorting] = useState([]);
//   const { accessToken } = getAuthUser();
//   const navigate = useNavigate();

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "id",
//         header: "ID",
//         size: 150,
//       },
//       {
//         accessorKey: "image",
//         header: "Image",
//         size: 100,
//         Cell: ({ row }) => (
//           <img
//             src={`http://127.0.0.1:8000/Storage/${row.original.image}`}
//             alt="User"
//             style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//           />
//         ),
//       },
//       {
//         accessorKey: "name",
//         header: "Name",
//         size: 200,
//       },
//       {
//         accessorKey: "email",
//         header: "Email Address",
//         size: 300,
//       },
//       {
//         accessorKey: "role",
//         header: "Role",
//         size: 150,
//       },
//     ],
//     []
//   );

//   const rowVirtualizerInstanceRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/allUsers", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const userData = await response.json();
//         setData(
//           userData.map((user) => ({
//             id: user.id,
//             image: user.image, // Adjust according to the actual structure of the user object
//             name: user.name, // Adjust according to the actual structure of the user object
//             email: user.email, // Adjust according to the actual structure of the user object
//             role: user.role, // Adjust according to the actual structure of the user object
//           }))
//         );
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     try {
//       rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [sorting]);

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     enableBottomToolbar: false,
//     enableGlobalFilterModes: true,
//     enablePagination: false,
//     enableRowNumbers: true,
//     enableRowVirtualization: true,
//     muiTableContainerProps: { sx: { maxHeight: "600px" } },
//     onSortingChange: setSorting,
//     state: { isLoading, sorting },
//     rowVirtualizerInstanceRef,
//     rowVirtualizerOptions: { overscan: 5 },
//   });



//   return (
//     <div className="all-users">
//       <div className="text-end mt-3">
//       <button onClick={() => handleEditSupplierClick ()} className='add-supplier btn1'>
//             Add Admin
//       </button> 
//       </div>
//       <MaterialReactTable table={table} />
//     </div>
//   );
// };

// export default AllUsers;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Products/AllProducts/ProductsTable.css"; // Assuming you save the CSS in ProductsTable.css
import { getAuthUser } from "../../../helper/Storage";
import "./AllUsers.css"
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { accessToken } = getAuthUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/allUsers", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Assuming accessToken is defined elsewhere
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        setUsers(
          userData.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users: " + error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleEditSupplierClick = () => {
    navigate(`/add-admin`);
 };
  // const handleUserDetailsClick = (userId) => {
  //   navigate(`/user/${userId}`);
  // };

  if (!users.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="prod-table">
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <button onClick={() => handleEditSupplierClick ()} className='add-supplier btn1'>
                 Add Admin
             </button> 
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/Storage/${user.image}`}
                    alt={user.name}
                    className="prod-image"
                  />
                </td>{" "}
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td></td>
                {/* Add more table cells if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
