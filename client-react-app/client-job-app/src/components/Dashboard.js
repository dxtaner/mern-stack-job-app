// Dashboard.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>

      <div className="link-container">
        <Link to="/MyProfile">My Profile</Link>
      </div>

      <div className="link-container">
        <Link to="/AllJobs">All Jobs</Link>
      </div>

      <div className="link-container">
        <Link to="/AddJob">Add Job</Link>
      </div>

      <div className="link-container">
        <Link to="/Stats">Stats</Link>
      </div>

      <button className="logout-button" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
