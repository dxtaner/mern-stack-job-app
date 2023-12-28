// SearchForm.js
import React from "react";
import "./SearchForm.css";

const SearchForm = ({
  statusFilter,
  jobTypeFilter,
  sortOption,
  searchTerm,
  handleStatusFilterChange,
  handleJobTypeFilterChange,
  handleSortOptionChange,
  handleSearchTermChange,
  handleResetFilters,
}) => {
  return (
    <div className="search-form-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="search-input"
        />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="statusFilter">Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="filter-select">
            <option value="all">All</option>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="jobTypeFilter">Job Type:</label>
          <select
            id="jobTypeFilter"
            value={jobTypeFilter}
            onChange={handleJobTypeFilterChange}
            className="filter-select">
            <option value="all">All</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortOption">Sort:</label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortOptionChange}
            className="filter-select">
            <option value="latest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <button className="reset-button" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default SearchForm;
