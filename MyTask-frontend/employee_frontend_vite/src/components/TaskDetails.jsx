import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./TaskDetails.css"; // Add CSS for styling
import Header from "./Header";

function EmployeeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the passed task data
  const task = location.state?.task;

  if (!task) {
    return <div>No data available</div>; // Fallback for missing data
  }

  return (
    <>
        <div><Header/></div>
        <div className="employee-details-container">
            <div className="employee-details-card">
                <h2 className="text-center">Task Details</h2>
                <div className="details-row">
                <span className="details-label">Title:</span>
                <span className="details-value">{task.title}</span>
                </div>
                <div className="details-row">
                <span className="details-label">Description:</span>
                <span className="details-value">{task.description}</span>
                </div>
                <div className="details-row">
                <span className="details-label">Due Date:</span>
                <span className="details-value">{task.due_date}</span>
                </div>
                <div className="details-row">
                <span className="details-label">Status:</span>
                <span className="details-value">{task.status}</span>
                </div>
                <div className="details-row">
                <span className="details-label">Priority:</span>
                <span className="details-value">{task.priority}</span>
                </div>

                <div className="details-buttons">
                <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
                </div>
            </div>
            </div>
    </>
    
  );
}

export default EmployeeDetails;
