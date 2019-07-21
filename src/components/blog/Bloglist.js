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
    window.scrollTo(0, 0);

    this.props.fetchAllPosts();
  }
  render() {
    return (
      <div className="container-row blog">
        <div className="blog-list col-xs-12 col-md-6">
          <h1>Blog</h1>
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
                      {/* <div className="body">{blog.body}</div> */}
                      <div className="body">
                        De Ligt is yet to clarify his future but appears to have
                        his sights set on Juventus after revealing the club are
                        interested and a desire to play alongside some of their
                        defenders. Marco Silva is intent on adding a reliable
                        goalscorer this summer and appears to have centred on
                        Wilson. De Ligt is yet to clarify his future but appears
                        to have{" "}
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
    { fetchAllPosts }
  )(Bloglist)
);
