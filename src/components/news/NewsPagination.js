import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const NewsPagination = ({
  newsPerPage,
  totalNews,
  paginate,
  props,
  subcat_name,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }
  let link = document.getElementById(`page-${props.match.params.page_id}`);
  $.when(link).then(function() {
    $(`#page-${props.match.params.page_id} a`).addClass("active-page");
  });
  return (
    <div className="col-md-8">
      <div className="pagination">
        {pageNumbers.map(number => (
          <li key={number} id={`page-${number}`} className="page-item">
            <Link
              onClick={() => paginate(number)}
              to={`/leagues/${number}`}
              className="page-link"
              id={`page-${number}`}
            >
              {number}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default NewsPagination;
