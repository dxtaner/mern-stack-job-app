// MyProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    location: "",
  });
  const [, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      return localStorage.getItem("token");
    };

    const fetchCurrentUser = async () => {
      try {
        const token = getTokenFromLocalStorage();

        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/v1/auth/getCurrentUser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = response.data.data.user;
          setUser(userData);
          setFormData({
            name: userData.name,
            lastname: userData.lastName,
            email: userData.email,
            location: userData.location,
          });
        } else {
          console.error("Token not found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.patch(
          `http://localhost:5000/api/v1/auth/updateUser/${user._id}`,
          {
            name: formData.name,
            lastName: formData.lastname,
            email: formData.email,
            location: formData.location,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUserData = response.data.data;

        setUser(updatedUserData.user);
        setFormData({
          name: updatedUserData.user.name,
          lastname: updatedUserData.user.lastName,
          email: updatedUserData.user.email,
          location: updatedUserData.location,
        });

        toast.success("User updated successfully!");
        navigate("/dashboard");
      } else {
        console.error("Token not found in local storage.");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
        toast.error(`Error updating user: ${error.response.data.message}`);
      } else {
        toast.error("An error occurred while updating user.");
      }
    }
  };

  return (
    <div className="profile-container">
      <Link to="/dashboard" className="back-link">
        Return to Dashboard
      </Link>
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

export default MyProfile;
