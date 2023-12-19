// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js"; // Import the Dashboard component
import AddJob from "./components/AddJob.js";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound.js";
import AllJobs from "./components/AllJobs.js";
import EditedJob from "./components/EditedJob.js";

import Stats from "./components/Stats.js";

import MyProfile from "./components/MyProfile.js";

const App = () => {
  // Function to check if a valid token is present in local storage
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    // Add any additional checks for token validity here
    return token !== null;
  };

  // Route wrapper to conditionally render the Dashboard component
  const PrivateRoute = ({ element, ...props }) => {
    return isTokenValid() ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: props.location }} />
    );
  };

  return (
    <Router>
      <div>
        {/* Your existing routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Use the PrivateRoute wrapper for the Dashboard route */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/MyProfile"
            element={<PrivateRoute element={<MyProfile />} />}
          />

          <Route
            path="/AddJob"
            element={<PrivateRoute element={<AddJob />} />}
          />

          <Route
            path="/AllJobs"
            element={<PrivateRoute element={<AllJobs />} />}
          />

          <Route
            path="/EditJob"
            element={<PrivateRoute element={<EditedJob />} />}
          />

          <Route path="/Stats" element={<PrivateRoute element={<Stats />} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
