import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Manage Employees, Students, Subjects & Timetable here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;

