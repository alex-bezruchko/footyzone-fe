import React from "react";
import loading from "./../../../src/loading.gif";

import { Link } from "react-router-dom";

const PostsList = ({ posts, loading }) => {
  if (loading) {
    return <img src={loading} alt="loading" />;
  }

  return (
    <div className="blog-list col-xs-12 col-md-7">
      <h1 className="category-header">Blog</h1>

      {posts.map(post => (
        <div posts={posts} className="category-blog">
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
