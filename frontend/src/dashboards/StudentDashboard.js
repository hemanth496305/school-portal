import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <p>View your subjects and timetable here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;

