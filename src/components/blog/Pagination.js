import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  subcat_name,
  currentPage,
}) => {
  const pageNumbers = [];
  //   window.scrollTo(0, 0);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
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
    <nav className="blog-pagination">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <Link
              onClick={() => paginate(number)}
              to={`/blog/page/${number}`}
              className="page-link"
              id={`page-${number}`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
