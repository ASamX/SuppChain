import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { getAuthUser } from "../../helper/Storage";
import { Link } from "react-router-dom";
import "./RawMaterials.css";

export default function RawMaterials() {
  const { accessToken } = getAuthUser();
  const [quantity, setQuantity] = useState(1);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Fetch materials data from the API
    fetch("http://127.0.0.1:8000/api/inventoryMaterials", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Materials from API:", data);
        // Assuming the response data is an array of materials
        setMaterials(data);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  }, [accessToken]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleRequestMaterials = (materialId) => {
    const material = materials.find(m => m.id === materialId);
    const currentQuantity = parseInt(material.quantity_kg);
    const additionalQuantity = parseInt(quantity);
    const newQuantity = currentQuantity + additionalQuantity;

    fetch(`http://127.0.0.1:8000/api/inventoryMaterials/factoryAdmin/${materialId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity_kg: newQuantity }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to update material quantity");
        }
        return response.json();
      })
      .then(data => {
        console.log("Updated material:", data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Material quantity updated successfully",
        });
        // Update the materials state with the new quantity
        setMaterials(materials.map(m => m.id === materialId ? { ...m, quantity_kg: newQuantity } : m));
      })
      .catch((error) => {
        console.error("Error updating material:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update material quantity",
        });
      });
  };

  return (
    <div>
      {materials.map((material, index) => (
        <div className="wrapp grid3" key={index}>
          <div className="supp-boxx">
            <div className="box-topp">
              <div className="title-flexx">
                <h3 className="box-titlee">{material.name}</h3>
              </div>
              <p className="descriptionn">{material.quantity_kg} kg</p>
            </div>
            <Form className="counterr">
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </Col>
              </Row>
            </Form>
            <Button 
              onClick={() => handleRequestMaterials(material.id)} 
              className="button"
            >
              Add materials
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}















































{/* <MDBRow>
      {materials.map((material, index) => (
        <MDBCol key={material.id} size="12" sm="6" md="4" lg="3" xl="2">
          <MDBCard className="mb-3 text-center bg-light shadow-5 text-dark">
            <MDBCardBody>
              <MDBCardTitle>{material.name}</MDBCardTitle>
              <MDBCardText>Quantity: {material.Quantity}</MDBCardText>
              <Link
                to={`/supplier/${material.supplier_id}`}
                className="btn btn-primary"
              >
                Order More
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>  */}




      // const handleRequestMaterials = () => {
  //   if (!supplier || !supplier.raw_materials) {
  //     return;
  //   }

  //   const requestData = {
  //     name: supplier.raw_materials,
  //     Quantity: quantity, // Start with the initially requested quantity
  //   };

  //   fetch(`http://127.0.0.1:8000/api/inventoryMaterials`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error fetching inventory materials");
  //       }
  //       return response.json();
  //     })
  //     .then((inventoryMaterials) => {
  //       const matchingMaterial = inventoryMaterials.find(
  //         (material) => material.name === supplier.raw_materials
  //       );

  //       if (matchingMaterial) {
  //         const updateData = {
  //           name: matchingMaterial.name,
  //           Quantity: parseInt(matchingMaterial.Quantity) + quantity,
  //         };

  //         return fetch(
  //           `http://127.0.0.1:8000/api/inventoryMaterials/${matchingMaterial.id}`,
  //           {
  //             method: "PATCH",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //             body: JSON.stringify(updateData),
  //           }
  //         );
  //       } else {
  //         return fetch(
  //           `http://127.0.0.1:8000/api/inventoryMaterials/supplier_id/${id}`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //             body: JSON.stringify(requestData),
  //           }
  //         );
  //       }
  //     })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to request materials");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: `You ordered ${supplier.raw_materials} with a quantity of ${quantity}`,
  //       });
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: `Failed to request materials: ${error.message}`,
  //       });
  //     });
  // };