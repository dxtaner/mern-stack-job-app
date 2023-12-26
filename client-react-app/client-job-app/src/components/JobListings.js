// JobListings.jsx
import React, { useState, useEffect } from "react";
import "./JobListings.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faClock,
  faMapMarkerAlt,
  faUser,
  faCalendarCheck,
  faTimesCircle,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import EditJobModal from "./EditJobModal.js";

const JobListings = ({ jobs }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = await showConfirmation();

    if (confirmDelete) {
      deleteJob(jobId);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEditedJob = async (editedJob) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/jobs/${editedJob._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedJob),
        }
      );

      if (response.ok) {
        toast.success("Job updated successfully", { autoClose: 2000 });
        setIsEditModalOpen(false);
        // window.location.reload();
      } else {
        console.error("Error updating job");
        toast.error("Error updating job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Error updating job");
    }
  };

  const showConfirmation = () => {
    return new Promise((resolve) => {
      toast.info(
        <div>
          <p>Are you sure you want to delete this job?</p>
          <div className="confirmation-buttons">
            <button
              onClick={() => {
                resolve(true);
                toast.dismiss();
              }}>
              Yes
            </button>
            <button
              onClick={() => {
                resolve(false);
                toast.dismiss();
              }}>
              No
            </button>
          </div>
        </div>,
        {
          autoClose: false,
        }
      );
    });
  };

  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/jobs/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Job deleted successfully", { autoClose: 2000 });
        window.location.reload();
      } else {
        console.error("Error deleting job");
        toast.error("Error deleting job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  // Add this function somewhere in your component or utility file
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="job-listings-container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="job-listing-card">
            <div className="job-header">
              <div className="job-title">
                <h4>
                  <FontAwesomeIcon icon={faBriefcase} className="job-icon" />
                  {job.position}
                </h4>
              </div>
              <div className="company">
                <p>{job.company}</p>
              </div>
              <div className="created-by">
                <p>
                  <FontAwesomeIcon icon={faUser} className="job-icon" />
                  {`${job.createdBy.name} ${job.createdBy.lastName}`}
                </p>
              </div>
            </div>

            <div className="job-details">
              <div className="location-date">
                <p className="job-info">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="job-icon" />
                  {job.jobLocation}
                </p>
                <p className="job-info">
                  <FontAwesomeIcon icon={faClock} className="job-icon" />
                  {formatDate(job.createdAt)}
                </p>
              </div>
              <div className="job-type-status">
                <p className="job-info">
                  <FontAwesomeIcon icon={faBriefcase} className="job-icon" />
                  {job.jobType}
                </p>
                <p className="job-info status-info">
                  {job.status === "pending" && (
                    <span className="status-badge badge-yellow">
                      <FontAwesomeIcon
                        icon={faHourglassHalf}
                        className="status-icon"
                      />
                      Pending
                    </span>
                  )}
                  {job.status === "interview" && (
                    <span className="status-badge badge-blue">
                      <FontAwesomeIcon
                        icon={faCalendarCheck}
                        className="status-icon"
                      />
                      Interview
                    </span>
                  )}
                  {job.status === "declined" && (
                    <span className="status-badge badge-red">
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="status-icon"
                      />
                      Declined
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="action-button edit-button"
                onClick={() => handleEdit(job)}>
                Edit
              </button>
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(job._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-jobs-message">No jobs found</p>
      )}

      {isEditModalOpen && (
        <EditJobModal
          job={selectedJob}
          onClose={handleEditModalClose}
          onSave={handleSaveEditedJob}
        />
      )}
    </div>
  );
};

export default JobListings;
