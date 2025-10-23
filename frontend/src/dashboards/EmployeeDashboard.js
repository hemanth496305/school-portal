import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="dashboard">
      <h2>Employee Dashboard</h2>
      <p>View your assigned subjects and timetable here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;

