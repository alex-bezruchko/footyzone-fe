import React from "react";
import loadingImage from "./../../../src/loading.gif";

import { Link } from "react-router-dom";

const PostsList = ({ currentPage, posts, loading, props }) => {
  if (loading) {
    return (
      <div className="container">
        <img className="loading" src={loadingImage} alt="loading" />
      </div>
    );
  }

  return (
    <div className="blog-list col-xs-12 col-md-7">
      <h1 className="category-header">Blog</h1>

      {posts.map(post => (
        <div posts={posts} key={post.id} className="category-blog">
          <Link to={`/blog/${post.id}`}>
            <h2>{post.title}</h2>
            <img className="img-responsive" src={post.postMainImg} alt="" />
            <div className="body">{post.body}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
