import React, { useState } from "react";
import Modal from "react-modal";
import "./EditJobModal.css";

const EditJobModal = ({ job, onClose, onSave }) => {
  const [editedJob, setEditedJob] = useState({ ...job });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedJob);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Edit Job Modal"
      className="edit-modal">
      <h2>Edit Job</h2>
      <label className="input-label">
        Position:
        <input
          type="text"
          name="position"
          value={editedJob.position}
          onChange={handleInputChange}
          className="input-field"
        />
      </label>
      <label className="input-label">
        Company:
        <input
          type="text"
          name="company"
          value={editedJob.company}
          onChange={handleInputChange}
          className="input-field"
        />
      </label>
      <label className="input-label">
        Job Location:
        <input
          type="text"
          name="jobLocation"
          value={editedJob.jobLocation}
          onChange={handleInputChange}
          className="input-field"
        />
      </label>
      <label className="input-label">
        Job Type:
        <select
          name="jobType"
          value={editedJob.jobType}
          onChange={handleInputChange}
          className="select-field">
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>
      </label>
      <label className="input-label">
        Status:
        <select
          name="status"
          value={editedJob.status}
          onChange={handleInputChange}
          className="select-field">
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
          <option value="pending">Pending</option>
        </select>
      </label>
      <div className="button-container">
        <button type="button" onClick={handleSave} className="save-button">
          Save
        </button>
        <button type="button" onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditJobModal;
