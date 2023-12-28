import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheckCircle,
  faTimesCircle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Stats.css";
import { Link } from "react-router-dom";

const Stats = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/jobs/stats",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data && data.defaultStats && data.monthlyApplications) {
            setStatistics(data);
          } else {
            console.error("Invalid statistics format:", data);
            setError("Invalid statistics format");
          }
        } else {
          console.error("Error fetching statistics:", response.status);
          setError("Error fetching statistics");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error.message);
        setError("Error fetching statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="stats-container">
      <h2 className="stats-header">Statistics</h2>

      <Link to="/dashboard" className="back-link">
        Return to Dashboard
      </Link>

      {loading && <p className="loading-message">Loading statistics...</p>}
      {error && <p className="error-message">{error}</p>}

      {statistics && (
        <div>
          <h3 className="stats-subheader">Application Status</h3>
          <ul className="stats-list">
            <li className="stats-item pending">
              <FontAwesomeIcon icon={faClock} />
              Pending: {statistics.defaultStats.pending}
            </li>
            <li className="stats-item interview">
              <FontAwesomeIcon icon={faCheckCircle} />
              Interview: {statistics.defaultStats.interview}
            </li>
            <li className="stats-item declined">
              <FontAwesomeIcon icon={faTimesCircle} />
              Declined: {statistics.defaultStats.declined}
            </li>
          </ul>

          <h3 className="stats-subheader">Monthly Applications</h3>
          <ul className="stats-list">
            {statistics.monthlyApplications.map((monthlyApp, index) => (
              <li key={index} className="stats-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {monthlyApp.formattedDate}: {monthlyApp.count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stats;
