import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchLatestOldschool,
  // fetchAllCategories,
} from "../../actions/newsActions";
import { Link } from "react-router-dom";
import $ from "jquery";

class WelcomeOldschool extends React.Component {
  componentDidMount() {
    this.props.fetchLatestOldschool();
  }
  render() {
    let body = document.getElementsByName('body')
    let maxLenBody = 250;
    let maxLenTitle = 50;
    console.log(body[0])
    $.when(body[0]).then(function () {
      if (body[0] && body[0].clientWidth > 500) {
        maxLenBody = 250;
        console.log(body[0])
        // console.log(maxLenBody)
      } else {
        maxLenBody = 100;
        // console.log(maxLenBody)
      }
    })
    console.log(body[0])



    return (
      <div className="container-row welcome-blog">
        <div className="container header">
          <h1>Old School</h1>
        </div>
        <div className="container">
          {this.props.news.length > 0 ? (
            <>
              {this.props.news.map((old_school, index) => {
                return (
                  <div
                    key={index}
                    id={old_school.id}
                    old_school={old_school}
                    className="category-blog col-md-6 col-xs-12"
                  >
                    <Link to={`/old-school/${old_school.subcat_name}/${old_school.id}`}>
                      <div className="list-header">
                        <img src={old_school.newsMainImg} alt="" />
                        {old_school.title.length < 50 && <h2>{old_school.title}</h2>}
                        {old_school.title.length > 50 && <h2>{old_school.title.slice(0, maxLenTitle).concat('...')}</h2>}
                      </div>

                      <div className="body">
                        <p>
                          <img
                            src={old_school.avatar}
                            alt="avatar"
                            className="avatar"
                          />
                          {old_school.body.slice(0, maxLenBody).concat('...')}
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

const mapStateToProps = ({ newsReducer: state }) => {
  return {
    news: state.news,
    loading: state.loading,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchLatestOldschool }
  )(WelcomeOldschool)
);
