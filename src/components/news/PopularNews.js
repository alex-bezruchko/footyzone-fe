import React from "react";
import { connect } from "react-redux";
// import $ from "jquery";
import { withRouter } from "react-router-dom";
// import loading from "./../../../src/loading.gif";
import { Link } from "react-router-dom";
import { fetchPopular } from "../../actions/newsActions";

class PopularNews extends React.Component {
  componentDidMount() {
    this.props.fetchPopular();
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <div className="sidebar-list">
            {/* <img alt="Loading gif" src={loading} /> */}
          </div>
        ) : (
            <div className="sidebar-list">
              <h2>Trending</h2>
              {this.props.popular.length > 0 ? (
                <>
                  {this.props.popular.map((news, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/news/${news.subcat_slug}/${news.id}`}
                      >
                        <div
                          id={news.id}
                          news={news}
                          className="sidebar-list-post"
                        >
                          <img src={news.newsMainImg} alt="" />
                          <p>{news.title}</p>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                  <></>
                )}
            </div>
          )}
      </>
    );
  }
}
const mapStateToProps = ({ newsReducer: state }) => {
  return {
    popular: state.popular,
    loading: state.loading,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchPopular,
    }
  )(PopularNews)
);
