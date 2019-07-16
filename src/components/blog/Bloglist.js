import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchAllPosts,
  // fetchAllCategories,
} from "../../actions/postsActions";
import { Link } from "react-router-dom";

class Bloglist extends React.Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }
  render() {
    return (
      <div className="blog-list">
        {this.props.posts.length > 0 ? (
          <>
            {this.props.posts.map((blog, index) => {
              return (
                <div
                  key={index}
                  id={blog.id}
                  blog={blog}
                  className="category-blog"
                >
                  <Link to={`/blog/${blog.id}`}>
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
  }
}

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
    { fetchAllPosts }
  )(Bloglist)
);
