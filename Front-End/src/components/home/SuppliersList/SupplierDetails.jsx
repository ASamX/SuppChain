import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import "./SupplierDetails.css"
const SupplierDetails = () => {
  const [supplier, setSupplier] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { accessToken } = getAuthUser();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching supplier details");
        }
        return response.json();
      })
      .then((data) => {
        setSupplier(data);
      })
      .catch((error) => {
        alert("Error fetching supplier details: " + error.message);
      });
  }, [id, accessToken]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleRequestMaterials = () => {
    if (!supplier || !supplier.raw_materials) {
      return;
    }

    const requestData = {
      name: supplier.raw_materials,
      quantity_kg: quantity,
    };

    fetch(`http://127.0.0.1:8000/api/inventoryMaterials`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching inventory materials");
        }
        return response.json();
      })
      .then((inventoryMaterials) => {
        const matchingMaterial = inventoryMaterials.find(
          (material) => material.name === supplier.raw_materials
        );

        if (matchingMaterial) {
          const updateData = {
            name: matchingMaterial.name,
            quantity_kg: parseInt(matchingMaterial.quantity_kg) + quantity,
          };

          return fetch(
            `http://127.0.0.1:8000/api/inventoryMaterials/factoryAdmin/${matchingMaterial.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(updateData),
            }
          );
        } else {
          return fetch(
            `http://127.0.0.1:8000/api/inventoryMaterials/factoryAdmin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(requestData),
            }
          );
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to request materials");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `You ordered ${supplier.raw_materials} with a quantity of ${quantity}`,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Failed to request materials: ${error.message}`,
        });
      });
  };

  if (!supplier) {
    return <div>Loading supplier details...</div>;
  }

  return (
    <div className="wrap">
      <div className="supp-box">
        <div className="box-top">
          <img className="box-image" src={`http://127.0.0.1:8000/Storage/${supplier.image}`} alt="Girl Eating Pizza" />
          <div className="title-flex">
            <h3 className="box-title">{supplier.supplier_name}</h3>
            <p className="user-follow-info">{supplier.supplier_email}</p>
          </div>
          <p className="description">{supplier.raw_materials}</p>
          <p className="description">{supplier.phone}</p>
        </div>
        <Form>
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
        <Button onClick={handleRequestMaterials} className="button">Add materials</Button>
      </div>
    </div>
  );
}

export default SupplierDetails;
