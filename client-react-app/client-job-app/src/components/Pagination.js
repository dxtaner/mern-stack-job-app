// Pagination.jsx

import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <button
          key={page}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => handlePageChange(page)}>
          {page}
        </button>
      )
    );
  };

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>
      )}

      {renderPageButtons()}

      {currentPage < totalPages && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
