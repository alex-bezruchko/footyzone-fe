import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import loading from "./../../../src/loading.gif";
import Newslist from "./../news/Newslist";
import Bloglist from "./../blog/Bloglist";
import {
  fetchPostsByCategory,
  fetchAllCategories,
} from "../../actions/postsActions";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "news",
      isCategory: false,
      categories: ["news", "blog", "videos", "old-school"],
    };
  }
  componentDidMount() {
    let category_name = this.props.match.params.cat_name;
    // let isCategory = this.state.isCategory;
    let categories = this.state.categories;
    // console.log(this.props.match);
    if (category_name && category_name.length > 0) {
      let filter = categories.filter(cat => cat === category_name);
      if (filter && filter.length > 0) {
        this.setState({
          isCategory: true,
        });
      } else {
        this.setState({
          isCategory: false,
        });
      }
    } else {
      this.setState({
        isCategory: false,
      });
    }
    console.log(category_name);
    if (this.state.isCategory === true) {
      this.setState({
        // category: category_name,
        isCategory: true,
      });
      this.props.fetchPostsByCategory(category_name);
      // console.log("true");
      // } else {
      //   this.setState({
      //     // category: "news",
      //     isCategory: true,
      //   });
      //   this.props.fetchPostsByCategory("news");

      // console.log("false");
    } else {
      this.props.fetchPostsByCategory(category_name);
    }
    // if (category_name === "news" || category_name === "videos") {
    //   this.setState({
    //     isCategory: true,
    //   });
    //   this.props.fetchPostsByCategory(category_name);
    // } else {
    //   this.setState({
    //     isCategory: false,
    //   });
    // }
  }

  componentDidUpdate(prevProps) {
    let category_name = this.props.match.params.cat_name;

    if (category_name !== prevProps.match.params.cat_name) {
      // let isCategory = this.state.isCategory;
      let categories = this.state.categories;
      // console.log(this.props.match);
      if (category_name.length > 0) {
        let filter = categories.filter(cat => cat === category_name);
        if (filter && filter.length > 0) {
          this.setState({
            isCategory: true,
          });
        } else {
          this.setState({
            isCategory: false,
          });
        }
      }
      if (this.state.isCategory === true) {
        this.props.fetchPostsByCategory(category_name);
        this.setState({
          // category: category_name,
        });
        // console.log("true");
      } else {
        // this.setState({
        //   category: "news",
        // });
        // console.log("false");
      }
    }
  }

  render() {
    // console.log(this.state.category);
    return (
      <>
        {!this.state.isCategory ? (
          <></>
        ) : (
          <div className="col-xs-12 col-md-8">
            {this.props.loading ? (
              <div>
                <img alt="Loading gif" src={loading} />
              </div>
            ) : (
              <div className="category-list">
                {/* <h1>{this.state.category}</h1> */}
                {/* <Newslist /> */}
                {this.state.category === "news" ? (
                  <Newslist news={this.props.posts} />
                ) : (
                  <></>
                )}
                {this.state.category === "news" ? (
                  <Bloglist blog={this.props.posts} />
                ) : (
                  <></>
                )}
                {/* {this.state.category === "blog" && (
                  <Bloglist blog={this.props.posts} />
                )} */}
                {/* {this.state.category === "videos" && <Videolist />}
                {this.state.category === "old-school" && <OldSchoollist />} */}
              </div>
            )}
          </div>
        )}
      </>
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
    { fetchPostsByCategory, fetchAllCategories }
  )(Category)
);
