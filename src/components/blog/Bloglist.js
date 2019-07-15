import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";

const Bloglist = props => {
  return (
    <div className="blog-list">
      {props.blog.length > 0 ? (
        <>
          {props.blog.map((blog, index) => {
            return (
              <div
                key={index}
                id={blog.id}
                blog={blog}
                className="category-blog"
              >
                <Link
                  to={`/${props.match.params.cat_name}/${blog.subcat_slug}/${
                    blog.id
                  }`}
                >
                  <h2>{blog.title}</h2>
                  <img src={blog.postMainImg} alt="" />
                  <div className="body">{blog.body}</div>
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
  )(Bloglist)
);
