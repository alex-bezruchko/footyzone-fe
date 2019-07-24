import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import loading from "./../../../src/loading.gif";

import { fetchNewsBySubCategory } from "../../actions/newsActions";
import { Link } from "react-router-dom";

class NewsCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.fetchNewsBySubCategory(this.props.match.params.subcat_name);
  }
  componentDidUpdate(prevProps) {
    let category_name = this.props.match.params.subcat_name;

    if (category_name !== prevProps.match.params.subcat_name) {
      this.props.fetchNewsBySubCategory(category_name);
    }
  }

  render() {
    return (
      <div className="container-row news">
        <div className="news-list container">
          {this.props.loading ? (
            <div className="container">
              <img className="img-responsive" alt="Loading gif" src={loading} />
            </div>
          ) : (
            <div className="col-sm-12 col-md-8">
              {this.props.news.length > 0 ? (
                <div className="container">
                  <h1 className="category-header">
                    {this.props.news[0].subcat_name}
                  </h1>
                  {this.props.news.map((news, index) => {
                    return (
                      <div
                        key={index}
                        id={news.id}
                        news={news}
                        className="category-news"
                      >
                        <Link to={`/news/${news.subcat_slug}/${news.id}`}>
                          <h2>{news.title}</h2>
                          <img
                            className="img-responsive"
                            src={news.newsMainImg}
                            alt=""
                          />
                          <div className="body">{news.body}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ newsReducer: state }) => {
  return {
    news: state.news,
    loading: state.loading,
    //   categories: state.categories,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNewsBySubCategory }
  )(NewsCategories)
);
// export default NewsCategories;
