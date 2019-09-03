import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import loading from "./../../../src/loading.gif";
import { Link } from "react-router-dom";

import {
  fetchPostsByCategory,
  fetchPostsBySubCategory,
  fetchAllCategories,
  fetchAllPosts,
  fetchUsersPosts,
} from "../../actions/postsActions";

class UsersList extends React.Component {
  componentDidMount() {
    let user_id = this.props.usersReducer.user.user_id;

    if (user_id) {
      this.props.fetchUsersPosts(user_id);
    }


    return (
      <div id="aside" className="col-md-4">
        {this.props.postsReducer.loading ? (
          <aside>
            <img alt="Loading gif" src={loading} className="loading" />
          </aside>
        ) : (
            <div className="sidebar-list users-post">
              <h2>Your Post</h2>

              {this.props.postsReducer.posts.map((post, index) => {
                return (
                  <Link key={index} to={`/blog/${post.id}`}>
                    <div id={post.id} post={post} className="sidebar-list-post">
                      <img src={post.postMainImg} alt="" />
                      <p>{post.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}
const mapStateToProps = ({ postsReducer, usersReducer }) => {
  return {
    postsReducer,
    usersReducer,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchPostsByCategory,
      fetchPostsBySubCategory,
      fetchAllCategories,
      fetchAllPosts,
      fetchUsersPosts,
    }
  )(UsersList)
);
