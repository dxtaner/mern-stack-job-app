// AllJobs.js
import React, { useState, useEffect } from "react";
import JobListings from "./JobListings";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";
import "./AllJobs.css";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/jobs?page=${currentPage}&status=${statusFilter}&jobType=${jobTypeFilter}&sort=${sortOption}&search=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const data = await response.json();

        setJobs(data.jobs);
        setTotalPages(data.numOfPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setJobs([]);
      }
    };

    fetchData();
  }, [token, currentPage, statusFilter, jobTypeFilter, sortOption, searchTerm]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleJobTypeFilterChange = (event) => {
    setJobTypeFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setJobTypeFilter("all");
    setSortOption("latest");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="all-jobs-container">
      <Link to="/dashboard" className="back-link">
        Return to Dashboard
      </Link>
      <h3 className="all-jobs-heading">All Jobs</h3>

      <div className="link-container">
        <Link to="/AddJob" className="add-job-link">
          Add a New Job
        </Link>
      </div>

      <SearchForm
        statusFilter={statusFilter}
        jobTypeFilter={jobTypeFilter}
        sortOption={sortOption}
        searchTerm={searchTerm}
        handleStatusFilterChange={handleStatusFilterChange}
        handleJobTypeFilterChange={handleJobTypeFilterChange}
        handleSortOptionChange={handleSortOptionChange}
        handleSearchTermChange={handleSearchTermChange}
        handleResetFilters={handleResetFilters}
      />

      <JobListings jobs={jobs} />

      <Pagination totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default AllJobs;
