import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import loading from "./../../../src/loading.gif";
import { Link } from "react-router-dom";
import {
  fetchPostsBySubCategory,
  fetchAllCategories,
} from "../../actions/postsActions";

class SubCategory extends React.Component {
  componentDidMount() {
    const category_name = this.props.match.params.category_name;
    const subcat_name = this.props.match.params.subcat_name;

    this.props.fetchPostsBySubCategory(category_name, subcat_name);
  }

  componentDidUpdate(prevProps) {
    const category_name = this.props.match.params.category_name;
    if (category_name !== prevProps.match.params.category_name) {
      this.props.fetchPostsBySubCategory(category_name);
    }
  }

  render() {
    return (
      <div className="col-md-8">
        {this.props.loading ? (
          <div>
            <img alt="Loading gif" src={loading} />
          </div>
        ) : (
          <div className="category-list">
            <h1>
              {this.props.match.params.category_name ? (
                <span>
                  {" "}
                  {this.props.match.params.subcat_name.split(" ").join("")}
                </span>
              ) : (
                <span />
              )}
            </h1>
            {this.props.posts.map((post, index) => {
              console.log(post);
              return (
                <div
                  key={index}
                  id={post.id}
                  post={post}
                  className="category-post"
                >
                  <Link
                    to={`/${this.props.match.params.category_name}/${
                      this.props.match.params.subcat_name
                    }/${post.id}`}
                  >
                    <h2>{post.title}</h2>
                    <img src={post.postMainImg} alt="" />
                    <div className="body">{post.body}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ postsReducer: state }) => {
  return {
    posts: state.posts,
    loading: state.loading,
    categories: state.categories,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPostsBySubCategory, fetchAllCategories }
  )(SubCategory)
);