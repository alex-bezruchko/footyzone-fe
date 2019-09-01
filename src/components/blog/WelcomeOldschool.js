import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import bricks from "./../../img/blog.jpg";
import $ from "jquery";
import {
  fetchLatestOldschool,
} from "../../actions/newsActions";
import { Link } from "react-router-dom";

class WelcomeOldschool extends React.Component {
  componentDidMount() {
    this.props.fetchLatestOldschool();

    const old_school = document.getElementsByClassName('container-row welcome-blog')
    const position = $(".container-row.welcome-blog").position();
    const blog = document.getElementsByClassName('container-row new-blog');
    const carousel = $(".container.carousel-container");

    $.when(old_school[0] && old_school[0].length > 0 && position && blog[0]).then(function () {
      if (old_school[0] && old_school[0].clientWidth < 500) {
        $(window).scroll(function () {
          if (($(window).scrollTop() > ($(blog[0]).outerHeight(true) + 80 + $(carousel[0]).outerHeight(true))) && ($(window).scrollTop() < ($(old_school[0]).outerHeight(true) * 8.33 / 10 + $(carousel[0]).outerHeight(true) + $(blog[0]).outerHeight(true) + 80))) {
            $('.oldschool-bg').css({ "position": "fixed", "top": "0" });
          }
          else {
            $('.oldschool-bg').css({ "position": "absolute", "top": "" });
          }
        });
      }
    }).catch(function (err) {
      console.log(err)
      this.props.history.push(`/${this.props.location.pathname}`)
    })

  }
  render() {
    let maxLenBody = 250;
    let maxLenTitle = 50;




    return (
      <div className="container-row welcome-blog">
        <img src={bricks} alt="shiny photoshopped stadium" className="oldschool-bg" />

        <div className="container header">
          <h1 className="bungee">Old School</h1>
          {/* hello */}
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
                    <Link to={`/old-school/${old_school.subcat_slug}/${old_school.id}`}>
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
