import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import imgLoading from "./../../../src/loading.gif";
import $ from "jquery";
import TwitterSidebar from "../parts/TwitterSidebar";
import { Link } from "react-router-dom";

import { FaThumbsUp } from "react-icons/fa";
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

import { FaPrint, FaCalendar } from "react-icons/fa";

const SingleNews = props => {

  const [singleNews, setSingleNews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeLength, setLikeLength] = useState(0);
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
      console.log(res.data)
      if (res.data.likes.length > 0 && props.usersReducer.user.user_id) {
        const ifLiked = res.data.likes.filter(like => Number(like.user_id) === Number(props.usersReducer.user.user_id));

        if (ifLiked.length > 0) {
          setIsLiked(true)
          setLikeId(ifLiked[0].id)
        } else {
          setIsLiked(false)
          setLikeId(null)

        }
      }
      setLikeLength(res.data.likes.length)
      setLoading(false);
      let page_path = props.match.path;
      if (page_path.includes('old-school')) {
        let row = document.getElementsByClassName('container-row news')
        let container = document.getElementsByClassName('col-md-8')
        let widget = document.getElementsByClassName('timeline-Widget')
        $.when(row[0] && container[0] && widget[0]).then(function () {
          if (row[0].clientWidth < 500) {
            row[0].style.backgroundColor = "rgba(255, 222, 194, 1)";

          }
          container[0].style.backgroundColor = "rgba(255, 222, 194, 1)";
          $('.timeline-Widget, .timeline-Widget body').css("background-color", "rgba(255, 222, 194, 1)")
          widget[0].childNodes[0].style.backgroundColor = "rgba(255, 222, 194, 1) !important";

        })
      }
    };

    fetchSingle();
    if (singleNews.tags && singleNews.tags.length === 0) {

      let list = document.getElementsByClassName('category-tag');
      $.when(list && list[0]).then(function () {
        console.log(list[0])
        list[0].style.display = "none";
      })
    }
    window.scrollTo(0, 0);

  }, [props.match.params.id, props.match.params.subcat_name]);

  const likeNews = async () => {
    const current_news_id = props.match.params.id;
    const current_user_id = props.usersReducer.user.user_id;
    if (isLiked === true) {
      const deleted = await axios.delete(`https://footyzone-be.herokuapp.com/api/news/newslikes/${likeId}`)
      if (deleted) {
        setIsLiked(false);
        setLikeId(null)
        setLikeLength(likeLength - 1)
        // like_button[0].childNodes[0].innerText
      }
    } else {

      if (current_news_id && current_user_id) {
        const newLike = {
          user_id: current_user_id,
          news_id: current_news_id
        }
        const result = await axios.post('https://footyzone-be.herokuapp.com/api/news/newslikes', newLike)
        console.log(result.data)
        if (Number(result.status) === 201) {
          setIsLiked(true)
          setLikeId(result.data.addedLike[0].id)
          setLikeLength(likeLength + 1)

        } else {
          setIsLiked(false)
          setLikeId(null)
          setLikeLength(likeLength)

        }
      }
    }
  }

  // Like Button JavaScript Css/ isLiked state
  const like_button = document.getElementsByClassName('counts');
  $.when(like_button[0] && like_button[0].length > 0).then(function () {
    if (isLiked === true) {
      like_button[0].childNodes[0].style.color = "#009fb7";
      like_button[0].childNodes[0].style.borderColor = "#009fb7";
    } else {
      like_button[0].childNodes[0].style.color = "black";
      like_button[0].childNodes[0].style.borderColor = "black";

    }
  })

  let client = document.getElementsByTagName("body");
  $.when(client).then(function () {
    if (client[0] && client[0].clientWidth > 992) {

      let twitterLarge = document.getElementsByClassName("twitter");
      $.when(twitterLarge).then(function () {
        let width = twitterLarge[0].clientWidth;
        $(".twitter").css("width", width);
        $(".twitter .twitter-fixed").css("width", width);
      });
    } else if ((client[0] && client[0].clientWidth < 992) && (client[0] && client[0].clientWidth > 600)) {
      let twitterDesktop = document.getElementsByClassName("twitter");
      $.when(twitterDesktop).then(function () {
        let width = twitterDesktop[0].clientWidth;
        $(".twitter").css("width", width);
        $(".twitter .twitter-fixed").css("width", width);
      });
    } else {
      let element = document.getElementsByName("body");
      $.when(element[0]).then(function () {
        $(".col-md-4.col-md-12").css({ "width": element[0].clientWidth, "margin-right": "auto", "margin-left": "auto", "right": "0" });

        $(".twitter .twitter-fixed").css("width", ((element[0].clientWidth * 9.5) / 10));
        // $(".twitter .twitter-fixed").css({ "max-width": "95%", "margin-right": "auto", "margin-left": "auto" })
        // $(".twitter-wrapper").css({ "width": "95%", "margin-right": "auto", "margin-left": "auto" })

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

  singleNews.tags && console.log(singleNews.tags[0])


  return (
    <div className="container-row news">
      <div className="container single-news-wrapper">
        {loading ? (
          <div className="container">
            <div className="col-md-8">
              <img
                className="loading"
                src={imgLoading}
                alt="Post is loading gif"
              />
            </div>
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
                        <div>
                          <FaPrint /> <span> by <span>{singleNews.username}</span></span>
                        </div>
                        <div>
                          <FaCalendar /> on {" "}
                          {new Date(
                            singleNews.published
                          ).toDateString()}
                        </div>
                      </div>
                      <img src={singleNews.newsMainImg} alt={singleNews.title} />
                    </div>
                    <div className="single-main">
                      <aside>
                        <div className="socials">
                          {singleNews.title ? (
                            <>
                              <div className="shares">

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

                              </div>
                              <div className="counts">
                                <FaThumbsUp onClick={likeNews} />{" "}
                                {likeLength > 0 && likeLength + "+"}
                              </div>
                            </>
                          ) : (
                              <></>
                            )}

                        </div>
                        <div className="related">
                          {singleNews.tags && singleNews.tags[0].tag_name ? (
                            <ul>
                              <h4>Related Topics</h4>
                              {singleNews.tags.map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="category-tag col-md-6 col-xs-12"
                                  >
                                    <Link
                                      to={`#`}
                                    >
                                      {tag.tag_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                              <ul>
                                <li><Link to="/leagues/laliga/page/1">La Liga</Link></li>
                                <li><Link to="/leagues/epl/page/1">EPL</Link></li>
                                <li><Link to="/leagues/uefacl/page/1">Uefa Cl</Link></li>
                              </ul>
                            )}
                        </div>
                      </aside>
                      <div className="single-body">
                        <div className="body">
                          {singleNews.body}

                        </div>
                        <div className="related related-bottom">
                          {singleNews.tags && singleNews.tags[0].tag_name ? (
                            <ul>
                              <h4>Related Topics</h4>
                              {/* {singleNews.tags[0].tag_name} */}
                              {singleNews.tags.map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="category-tag"
                                  >
                                    <Link
                                      to={`#`}
                                    >
                                      {tag.tag_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                              <ul>
                                <li><Link to="/leagues/laliga/page/1">La Liga</Link></li>
                                <li><Link to="/leagues/epl/page/1">EPL</Link></li>
                                <li><Link to="/leagues/uefacl/page/1">Uefa Cl</Link></li>
                              </ul>
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
const MapStateToProps = ({ newsReducer, usersReducer }) => {
  return {
    newsReducer,
    usersReducer
  };
};


export default connect(
  MapStateToProps,
  {}
)(SingleNews);
