import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import NewsCatList from "./NewsCatList";
// import { fetchNewsBySubCategory } from "../../actions/newsActions";
// import { Link } from "react-router-dom";

const NewsCategories = props => {
  window.scrollTo(0, 0);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://footyzone-be.herokuapp.com/api/news/${
          props.match.params.subcat_name
        }`
      );
      setNews(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, [props.match.params.subcat_name]);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="container-row news">
      {/* <div className="news-list "> */}
      <div className="container">
        <div className="col-sm-12 col-md-8">
          <h1 className="category-header">{props.match.params.subcat_name}</h1>
        </div>
      </div>
      <div className="container-row">
        <NewsCatList
          news={currentNews}
          loading={loading}
          subcat_name={props.match.params.subcat_name}
          className="container"
        />

        <Pagination
          newsPerPage={newsPerPage}
          totalNews={news.length}
          paginate={paginate}
          subcat_name={props.match.params.subcat_name}
          currentPage={currentPage}
        />
      </div>

      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default NewsCategories;
