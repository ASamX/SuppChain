import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Manufacture.css"; // Import the CSS file

const Manufacture = () => {
  const { accessToken } = getAuthUser();
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

  console.log("Materials state:", materials);

  return (
    <div className="wrap">
      <div className="supp-box">
        <div className="box-top">
    
        </div>
        <Form className="counter">
          <Row>
            <Col>
              <Form.Control
                type="number"
                min="1"
                // value={quantity}
                // onChange={handleQuantityChange}
              />
            </Col>
          </Row>
        </Form>
        <Button 
        // onClick={handleRequestMaterials} 
        className="button">Request materials
        </Button>
      </div>
    </div>
  );
}

export default Manufacture;





{/* <div className="card-container grid3">
      {materials.map((material, index) => (
        <div key={material.id} className="col">
          <div className="man-card mb-3">
            <div className="card-body">
              <h2 className="card-title">{material.name}</h2>
              <p className="card-text">Quantity: {material.Quantity}</p>
              <Link
                to={`/supplier/${material.supplier_id}`}
                className="btn btn-order"
              >
                Order More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div> */}