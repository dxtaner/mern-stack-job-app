// UserProfile.js
import React from "react";

const UserProfile = ({ formData, handleInputChange, handleUpdateUser }) => {
  return (
    <div className="profile-container">
      <h3 className="profile-heading">My Profile</h3>
      <div className="profile-input">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="update-button"
        type="button"
        onClick={handleUpdateUser}>
        Update User
      </button>
    </div>
  );
};

export default UserProfile;
