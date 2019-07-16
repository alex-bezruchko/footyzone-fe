import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import loading from "./../../../src/loading.gif";
import { Link } from "react-router-dom";
import {
  fetchPostsByCategory,
  fetchPostsBySubCategory,
  fetchAllCategories,
  fetchAllPosts,
} from "../../actions/postsActions";

class RelatedPosts extends React.Component {
  componentDidMount() {
    const category_name = this.props.match.params.category_name;
    const subcat_name = this.props.match.params.subcat_name;

    if (category_name && subcat_name) {
      this.props.fetchAllCategories();
      this.props.fetchPostsBySubCategory(category_name, subcat_name);
    } else {
      this.props.fetchPostsByCategory(category_name);
    }

    $(window).scroll(function(e) {
      const width = document.getElementById("aside");
      $(".content.container").css({ flexDirection: "row" });
      if (width) {
        $(".col-md-4").css({
          width: `${width.clientWidth}`,
          marginTop: `20px`,
          position: `relative`,
          alignSelf: `flex-start`,
        });
      }
      if ($(window).scrollTop() > 75) {
        if (width) {
          $(".content.container").css({ flexDirection: "column" });
          $(".col-md-4").css({
            width: `${width.clientWidth}`,
            marginTop: `-180px`,
            position: `fixed`,
            alignSelf: `flex-end`,
          });
        } else {
          $(".content.container").css({ flexDirection: "row" });
          $(".col-md-4").css({
            width: `initial`,
            marginTop: `20px`,
            position: `relative`,
            alignSelf: `flex-start`,
          });
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const category_name = this.props.match.params.category_name;
    const subcat_name = this.props.match.params.subcat_name;

    if (category_name && subcat_name) {
      if (subcat_name !== prevProps.match.params.subcat_name) {
        this.props.fetchPostsBySubCategory(category_name, subcat_name);
      }
    } else {
      if (category_name !== prevProps.match.params.category_name) {
        this.props.fetchPostsByCategory(category_name);
      }
    }
  }

  render() {
    return (
      <div id="aside" className="col-md-4">
        {this.props.loading ? (
          <div>
            <img alt="Loading gif" src={loading} />
          </div>
        ) : (
          <div className="sidebar-list">
            <h2>Related</h2>

            {this.props.posts.map((post, index) => {
              return (
                <Link key={index} to={`/post/${post.id}`}>
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
    {
      fetchPostsByCategory,
      fetchPostsBySubCategory,
      fetchAllCategories,
      fetchAllPosts,
    }
  )(RelatedPosts)
);
