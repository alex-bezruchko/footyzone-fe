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
  let maxLenBody = 266;

  return (
    <div className="blog-list col-xs-12 col-md-7">
      <h1 className="category-header">Blog</h1>

      {posts.map(post => (
        <div posts={posts} key={post.id} className="category-blog">
          <Link to={`/blog/${post.id}`}>
            <h2>{post.title}</h2>
            <img className="img-responsive" src={post.postMainImg} alt="" />
            <div className="body">
            {post.body && post.body.length ?
              <p>{post.body.slice(0,maxLenBody).concat('...') }</p>
              :
              <p>
              Kroenke's statement read: "While we understand, appreciate, and agree with concerns about our club failing to achieve our goal of qualifying for the 2019-20 Champions League, we respectfully disagree it is at a crossroads and things need to change because so much change has already occurred.</p>
            }</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
