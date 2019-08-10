import React, { useState, useEffect } from "react";
import axios from "axios";

import imgLoading from "./../../../src/loading.gif";
import $ from "jquery";
import TwitterSidebar from "../parts/TwitterSidebar";
import { Link } from "react-router-dom";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";

const SingleNews = props => {
  // componentDidMount() {
  const [singleNews, setSingleNews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSingle = async () => {
      setLoading(true);
      const id = props.match.params.id;
      const subcat_name = props.match.params.subcat_name;
      const res = await axios.get(
        `https://footyzone-be.herokuapp.com/api/news/${subcat_name}/${id}`
      );
      setSingleNews(res.data);
      setLoading(false);
    };
    fetchSingle();
  }, [props.match.params.id, props.match.params.subcat_name]);

  let client = document.getElementsByTagName("body");
  $.when(client).then(function () {
    if (client[0] && client[0].clientWidth > 992) {
      let element = document.getElementsByClassName("twitter");
      $.when(element).then(function () {
        let width = element[0].clientWidth;
        $(".twitter").css("width", width);
        $(".twitter .twitter-fixed").css("width", width);
      });
    } else if (client[0] && client[0].clientWidth < 992) {
      let element = document.getElementsByClassName("twitter");
      $.when(element).then(function () {
        let width = element[0].clientWidth;
        $(".twitter").css("width", width);
        $(".twitter .twitter-fixed").css("width", width);
      });
    } else {
      let element = document.getElementsByClassName("twitter");
      $.when(element).then(function () {
        let width = element[0].clientWidth;
        $(".twitter").css({ "width": width * 90 / 100, "margin-right": "auto", "margin-left": "auto" });
        $(".twitter .twitter-fixed").css({ "width": width * 90 / 100, "margin-right": "auto", "margin-left": "auto" })
      });
    }
  });


  $(window).scroll(function (e) {
    if ($(window).scrollTop() > 800) {
      $(".single-main aside").addClass("aside-fixed");
      $(".single-body").addClass("body-fixed");
    } else {
      $(".single-main aside").removeClass("aside-fixed");
      $(".single-body").removeClass("body-fixed");
    }
  });
  $(window).scroll(function (e) {
    let article = document.getElementsByClassName("single-news");

    if (article[0]) {
      let height = article[0].clientHeight;
      if (
        $(window).scrollTop() > 150 &&
        $(window).scrollTop() < (height * 8.5) / 10
      ) {
        $(".col-md-4 .twitter").addClass("twitter-fixed");
      } else {
        $(".col-md-4 .twitter").removeClass("twitter-fixed");
        $(".single-main aside").removeClass("aside-fixed");

        $(".single-body").removeClass("body-fixed");
      }
    }
  });
  window.scrollTo(0, 0);

  return (
    <div className="container-row news">
      <div className="container single-news-wrapper">
        {loading ? (
          <div className="container">
            <img
              className="loading"
              src={imgLoading}
              alt="Post is loading gif"
            />
          </div>
        ) : (
            <>
              {singleNews && (
                <>
                  <div className="col-md-8 col-xs-12 single-news">
                    <div className="single-header">
                      {" "}
                      <h2>{singleNews.title}</h2>
                      <div className="author">
                        <p>
                          Submitted on{" "}
                          {new Date(singleNews.published).toDateString()}
                        </p>
                        <img alt="author" src={singleNews.avatar} />
                      </div>
                      <img src={singleNews.newsMainImg} alt={singleNews.title} />
                    </div>
                    <div className="single-main">
                      <aside>
                        <div className="socials">
                          {singleNews.title ? (
                            <>
                              <FacebookShareButton
                                url={window.location.href}
                                media={singleNews.title}
                                className="button"
                              >
                                <FacebookIcon size={32} round={false} />
                              </FacebookShareButton>
                              <TwitterShareButton
                                url={window.location.href}
                                media={singleNews.title}
                                className="button"
                              >
                                <TwitterIcon size={32} round={false} />
                              </TwitterShareButton>
                              <PinterestShareButton
                                url={window.location.href}
                                media={singleNews.title}
                                className="button"
                              >
                                <PinterestIcon size={32} round={false} />
                              </PinterestShareButton>
                              <WhatsappShareButton
                                url={window.location.href}
                                media={singleNews.title}
                                className="button"
                              >
                                <WhatsappIcon size={32} round={false} />
                              </WhatsappShareButton>
                              <RedditShareButton
                                url={window.location.href}
                                media={singleNews.title}
                                className="button"
                              >
                                <RedditIcon size={32} round={false} />
                              </RedditShareButton>
                            </>
                          ) : (
                              <></>
                            )}
                        </div>
                        <div className="related">
                          <h4>Related Topics</h4>
                          {singleNews.tags ? (
                            <ul>
                              {singleNews.tags.map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="category-tag col-md-6 col-xs-12"
                                  >
                                    <Link
                                      to={`/category/${tag.tag_slug}/`}
                                    >
                                      {tag.tag_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                              <></>
                            )}
                        </div>
                      </aside>
                      <div className="single-body">
                        <div className="body">
                          {singleNews.body}

                        </div>
                        <div className="related related-bottom">
                          <h4>Related Topics</h4>
                          {singleNews.tags ? (
                            <ul>
                              {singleNews.tags.map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="category-tag"
                                  >
                                    <Link
                                      to={`/category/${tag.tag_slug}/`}
                                    >
                                      {tag.tag_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                              <></>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xs-12">
                    <div className="twitter">
                      <TwitterSidebar props={props} />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
      </div>
    </div>
  );
};

export default SingleNews;
