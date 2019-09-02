import React from "react";
import { Link } from "react-router-dom";
import imgLoading from "./../../../src/loading.gif";
import TwitterSidebar from "../parts/TwitterSidebar";

const NewsCatList = ({ news, loading, subcat_name, props }) => {
  window.scrollTo(0, 0);

  if (loading) {
    return (
      <div className="container">
        <div className="col-sm-12 col-md-8 search">
          <img src={imgLoading} alt="loading" className="loading" />
        </div>
      </div>
    );
  }
  let maxLenBody = 250;

  return (
    <div className="news-list container">
      <div className="col-sm-12 col-md-8">
        <div className="category-header">
          {news[0] && <h1>{news[0].subcat_name}</h1>}
          {news[0] && <img className="subcat_logo" alt="logo" src={news[0].logo} />}
        </div>
        {/* </div> */}
        <div news={news} className="category-news">
          {news.map(news => (
            <Link to={`/news/${news.subcat_slug}/${news.id}`}>
              <h2>{news.title}</h2>
              <img className="col-md-8-img" src={news.newsMainImg} alt="" />
              <div className="body">{news.body.slice(0, maxLenBody).concat('...')}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-md-4 col-xs-12">
        <div className="twitter">
          <TwitterSidebar props={props} />
        </div>
      </div>
    </div>
  );
};

export default NewsCatList;
