import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import loading from "./../../../src/loading.gif";
import { Link } from "react-router-dom";
import {
  fetchPostsByCategory,
  fetchAllCategories,
  fetchPosts,
} from "../../actions/postsActions";

class Category extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.fetchAllCategories();
      this.props.fetchPostsByCategory(id);
    } else {
      this.props.fetchPosts();
    }

    $(window).scroll(function(e) {
      //   console.log(e);
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
            marginTop: `80px`,
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
    const id = this.props.match.params.id;

    if (id !== prevProps.match.params.id) {
      // this.props.fetchAllCategories()
      this.props.fetchPostsByCategory(id);
    }
  }

  render() {
    // const category_id = this.props.match.params.id;
    // const catName = this.props.categories.find(function(cat) {
    //   return Number(cat.id) === Number(category_id);
    // });
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
    { fetchPostsByCategory, fetchAllCategories, fetchPosts }
  )(Category)
);
