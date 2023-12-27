// AddJob.js
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./AddJob.css";

const AddJob = () => {
  const [jobData, setJobData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    jobStatus: "interview",
    jobType: "full-time",
  });

  const handleInputChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const apiUrl = "http://localhost:5000/api/v1/jobs";

    try {
      await axios.post(apiUrl, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job added successfully");

      setJobData({
        position: "",
        company: "",
        jobLocation: "",
        jobStatus: "interview",
        jobType: "full-time",
      });
    } catch (error) {
      toast.error(`Error adding job: ${error.message}`);
    }
  };

  return (
    <div className="add-jobs-container">
      <Link to="/dashboard" className="back-link">
        Return to Dashboard
      </Link>
      <h3 className="add-jobs-heading">Add a New Job</h3>

      <div className="link-container">
        <Link to="/AllJobs" className="show-all-jobs-link">
          Show All Jobs
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            onChange={handleInputChange}
            value={jobData.position}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            onChange={handleInputChange}
            value={jobData.company}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobLocation">Job Location:</label>
          <input
            type="text"
            id="jobLocation"
            name="jobLocation"
            onChange={handleInputChange}
            value={jobData.jobLocation}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobStatus">Job Status:</label>
          <select
            id="jobStatus"
            name="jobStatus"
            onChange={handleInputChange}
            value={jobData.jobStatus}
            className="select-field"
            required>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jobType">Job Type:</label>
          <select
            id="jobType"
            name="jobType"
            onChange={handleInputChange}
            value={jobData.jobType}
            className="select-field"
            required>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Job
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddJob;
