import React from "react";
import { Link } from "react-router-dom";
import imgLoading from "./../../../src/loading.gif";

const NewsCatList = ({ news, loading, subcat_name }) => {
  window.scrollTo(0, 0);

  if (loading) {
    return (
      <div className="container">
        <div className="col-sm-12 col-md-8">
          <img src={imgLoading} alt="loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="news-list container">
      <div className="col-sm-12 col-md-8">
        <div news={news} className="category-news">
          {news.map(news => (
            <Link to={`/news/${news.subcat_slug}/${news.id}`}>
              <h2>{news.title}</h2>
              <img className="img-responsive" src={news.newsMainImg} alt="" />
              <div className="body">{news.body}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCatList;
