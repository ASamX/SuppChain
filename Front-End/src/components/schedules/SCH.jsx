import React, { useEffect, useState } from "react";
import { getAuthUser } from "../../helper/Storage";
import Swal from "sweetalert2";
import './SCH.css';

function SCH() {
  const [schedule, setSchedule] = useState([]);
  const { accessToken } = getAuthUser();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/schedule", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch schedule data");
        }
        return response.json();
      })
      .then((data) => {
        setSchedule(data);
      })
      .catch((error) => {
        console.error("Error fetching schedule data:", error);
      });
  }, [accessToken]);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://127.0.0.1:8000/api/schedule/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then((updatedItem) => {
        setSchedule((prevSchedule) =>
          prevSchedule.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        if (newStatus === "Accept") {
          Swal.fire({
            title: "Accepted!",
            text: `You accepted the manufacturing of product ID: ${id}`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="schedule-container">
      <h1>Manufacturing Requests</h1>
      {schedule.length > 0 ? (
        <table className="futuristic-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule
              .filter((item) => item.status !== "Accept")
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>{item.status}</td>
                  <td>
                    <select
                      className="status-dropdown"
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                    >
                      {item.status === "Pending" ? (
                        <>
                          <option value="Pending">Pending</option>
                          <option value="Accept">Accept</option>
                        </>
                      ) : (
                        <>
                          <option value="Pending">Pending</option>
                          <option value="Accept">Accept</option>
                        </>
                      )}
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>Either no schedule data available or Loading data...</p>
      )}
    </div>
  );
}

export default SCH;
