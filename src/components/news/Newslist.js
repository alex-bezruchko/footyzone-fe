import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";

const Newslist = props => {
  return (
    <div className="news-list">
      {props.news.length > 0 ? (
        <>
          {props.news.map((news, index) => {
            return (
              <div
                key={index}
                id={news.id}
                news={news}
                className="category-news"
              >
                <Link
                  to={`/${props.match.params.cat_name}/${news.subcat_slug}/${
                    news.id
                  }`}
                >
                  <h2>{news.title}</h2>
                  <img src={news.newsMainImg} alt="" />
                  <div className="body">{news.body}</div>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = ({ postsReducer: state }) => {
  return {
    posts: state.posts,
    loading: state.loading,
    //   categories: state.categories,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Newslist)
);
