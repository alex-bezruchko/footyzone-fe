import React, { useState, useEffect } from "react";
import NewsCatPagination from "./NewsCatPagination";
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
      if (props.match.params.subcat_name === "page") {
        props.history.push(`/news/page/1`);
        setLoading(false);
      } else {
        const res = await axios.get(
          `https://footyzone-be.herokuapp.com/api/news/${
            props.match.params.subcat_name
          }`
        );
        setNews(res.data);
        if (
          props.match.params.page_id === 1 ||
          props.match.params.page_id === undefined
        ) {
          props.history.push(`/news/${props.match.params.subcat_name}/page/1`);
          setCurrentPage(1);
          setLoading(false);
        } else {
          props.history.push(
            `/news/${props.match.params.subcat_name}/page/${
              props.match.params.page_id
            }`
          );
          setCurrentPage(props.match.params.page_id);
          setLoading(false);
        }
      }
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
        <div className="container pagination">
          <NewsCatPagination
            newsPerPage={newsPerPage}
            totalNews={news.length}
            paginate={paginate}
            subcat_name={props.match.params.subcat_name}
            currentPage={currentPage}
            props={props}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsCategories;
