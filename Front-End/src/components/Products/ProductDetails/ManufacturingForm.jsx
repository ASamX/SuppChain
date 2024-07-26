// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// const ManufacturingForm = ({ onRequestMaterials }) => {
//   const [quantity, setQuantity] = useState(""); // State variable to store the quantity input

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Call the onRequestMaterials function passed from the parent component
//     onRequestMaterials(quantity);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="quantity">
//         <Form.Label>Quantity:</Form.Label>
//         <Form.Control
//           type="number"
//           min="1"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)} // Update the quantity state when the input changes
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Send manufacturing request
//       </Button>
//     </Form>
//   );
// };

// export default ManufacturingForm;
