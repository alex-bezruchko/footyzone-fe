import React from "react";
import { Link } from "react-router-dom";

const NewsCatList = ({ news, loading, subcat_name }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div news={news} className="category-news">
      {news.map(news => (
        <Link to={`/news/${news.subcat_slug}/${news.id}`}>
          <h2>{news.title}</h2>
          <img className="img-responsive" src={news.newsMainImg} alt="" />
          <div className="body">{news.body}</div>
        </Link>
      ))}
    </div>
  );
};

export default NewsCatList;
