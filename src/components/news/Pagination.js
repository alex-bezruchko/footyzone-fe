import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
  newsPerPage,
  totalNews,
  paginate,
  subcat_name,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }
  let link = document.getElementById(`page-${currentPage}`);
  if (link) {
    let links = Array.from(document.getElementsByClassName("page-link"));
    if (links) {
      links.map(link => (link.className = "page-link"));
    }
    link.className = "page-link active-page";
  }
  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <Link
              onClick={() => paginate(number)}
              to={`/news/${subcat_name}`}
              className="page-link"
              id={`page-${number}`}
            >
              {number}
            </Link>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
