import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsPagination from "./NewsPagination";
import imgLoading from "./../../../src/loading.gif";

import { Link } from "react-router-dom";

const Newslist = props => {
  window.scrollTo(0, 0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://footyzone-be.herokuapp.com/api/news/`
      );
      setNews(res.data);
      if (
        props.match.params.page_id === 1 ||
        props.match.params.page_id === undefined
      ) {
        props.history.push(`/news/1`);
        setCurrentPage(1);
        setLoading(false);
      } else {
        props.history.push(`/news/${props.match.params.page_id}`);
        setCurrentPage(props.match.params.page_id);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [props.match.params.page_id]);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container-row news">
      {loading ? (
        <div className="container">
          <img className="loading" alt="Loading gif" src={imgLoading} />
        </div>
      ) : (
        <div className="container-row">
          <div className="news-list container">
            <div className="col-sm-12 col-md-8">
              {currentNews.length > 0 ? (
                <div className="list-wrapper">
                  <h1 className="category-header">Latest Scoop</h1>

                  {currentNews.map((news, index) => {
                    return (
                      <div
                        key={index}
                        id={news.id}
                        news={news}
                        className="category-news"
                      >
                        <Link to={`/news/${news.subcat_slug}/${news.id}`}>
                          <h2>{news.title}</h2>
                          <img
                            className="img-responsive"
                            src={news.newsMainImg}
                            alt=""
                          />
                          <div className="body">{news.body}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="container pagination">
            <NewsPagination
              newsPerPage={newsPerPage}
              totalNews={news.length}
              paginate={paginate}
              props={props}
              subcat_name={props.match.params.subcat_name}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Newslist;
