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
          <img src={imgLoading} alt="loading"/>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list container">
      <div className="col-sm-12 col-md-8">
        <h1 className="category-header">{props.match.params.subcat_name}</h1>
        {/* </div> */}
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
      <div className="col-md-4 col-xs-12">
        <div className="twitter">
          <TwitterSidebar props={props} />
        </div>
      </div>
    </div>
  );
};

export default NewsCatList;
