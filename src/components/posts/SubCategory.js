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
    let category_name = this.props.match.params.category_name;
    let subcat_name = this.props.match.params.subcat_name;
    console.log(subcat_name);
    console.log(this.props.match);
    if (
      subcat_name ===
        ("blog" ||
          "oldschool" ||
          "laliga" ||
          "epl" ||
          "goals" ||
          "interviews" ||
          "highlights") &&
      category_name === ("news" || "videos")
    ) {
      this.setState({
        isCategory: true,
      });
      this.props.fetchPostsBySubCategory(category_name, subcat_name);
      // this.props.fetchPostsByCategory(category_name);
    } else {
      this.setState({
        isCategory: false,
      });
    }
    // this.props.fetchPostsBySubCategory(category_name, subcat_name);
  }

  componentDidUpdate(prevProps) {
    let category_name = this.props.match.params.category_name;
    let subcat_name = this.props.match.params.subcat_name;
    if (
      category_name !== prevProps.match.params.category_name ||
      subcat_name !== prevProps.match.params.subcat_name
    ) {
      if (
        subcat_name ===
          ("blog" ||
            "oldschool" ||
            "laliga" ||
            "epl" ||
            "goals" ||
            "interviews" ||
            "highlights") &&
        category_name === ("news" || "videos")
      ) {
        this.setState({
          isCategory: true,
        });
        this.props.fetchPostsBySubCategory(category_name, subcat_name);
        // this.props.fetchPostsByCategory(category_name);
      } else {
        this.setState({
          isCategory: false,
        });
      }
    }
  }

  render() {
    return (
      <div className="col-xs-12 col-md-8">
        {this.props.loading ? (
          <div>
            <img alt="Loading gif" src={loading} />
          </div>
        ) : (
          <div className="category-list">
            <h1>
              {this.props.match.params.subcat_name ? (
                <span>
                  {" "}
                  {this.props.match.params.subcat_name.split(" ").join("")}
                </span>
              ) : (
                <span />
              )}
            </h1>
            {this.props.posts.map((post, index) => {
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
