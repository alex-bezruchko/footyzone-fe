import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchLatestPosts,
  // fetchAllCategories,
} from "../../actions/postsActions";
import { Link } from "react-router-dom";

class WelcomeBloglist extends React.Component {
  componentDidMount() {
    this.props.fetchLatestPosts();
  }
  render() {
    return (
      <div className="container-row welcome-blog">
        <div className="container header">
          <h1>Blog</h1>
        </div>
        <div className="container">
          {this.props.posts.length > 0 ? (
            <>
              {this.props.posts.map((blog, index) => {
                return (
                  <div
                    key={index}
                    id={blog.id}
                    blog={blog}
                    className="category-blog col-md-6 col-xs-12"
                  >
                    <Link to={`/blog/${blog.id}`}>
                      <img src={blog.postMainImg} alt="" />
                      {/* <div className="body">{blog.body}</div> */}
                      <h2>{blog.title}</h2>
                      <div className="body">
                        <img
                          src={blog.avatar}
                          alt="avatar"
                          className="avatar"
                        />
                        <p>
                          De Ligt is yet to clarify his future but appears to
                          have his sights set on Juventus after revealing the
                          club are interested and a desire to play alongside
                          some of their defenders. Marco Silva is intent on
                          adding a reliable goalscorer this summer and appears
                          to have centred on Wilson.
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
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
    { fetchLatestPosts }
  )(WelcomeBloglist)
);
