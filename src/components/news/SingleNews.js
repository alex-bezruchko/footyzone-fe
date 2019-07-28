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
  window.scrollTo(0, 0);
  const [singleNews, setSingleNews] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [newsPerPage] = useState(5);

  useEffect(() => {
    const fetchSingle = async () => {
      setLoading(true);
      // if (props.match.params.subcat_name === ("epl" || "laliga" || "epl")) {
      //   props.history.push(
      //     `/news/${props.match.params.subcat_name}/page/${
      //       props.match.params.page_id
      //     }`
      //   );
      //   setLoading(false);
      // } else {
      const id = props.match.params.id;
      const subcat_name = props.match.params.subcat_name;
      const res = await axios.get(
        `https://footyzone-be.herokuapp.com/api/news/${subcat_name}/${id}`
      );
      setSingleNews(res.data);
      setLoading(false);

      console.log(res.data);
      // if (
      //   props.match.params.page_id === 1 ||
      //   props.match.params.page_id === undefined
      // ) {
      //   props.history.push(`/news/page/1`);
      //   setCurrentPage(1);
      //   setLoading(false);
      // } else {
      //   props.history.push(`/news/page/${props.match.params.page_id}`);
      //   setCurrentPage(props.match.params.page_id);
      //   setLoading(false);
      // }
      // }
    };
    fetchSingle();
  }, [props.match.params.id, props.match.params.subcat_name]);

  // if (
  //   props.match.params.subcat_name === ("uefacl" || "epl" || "laliga") &&
  //   props.match.params.id
  // ) {
  // this.props.viewNews("news", subcat_name, id);
  $(window).scroll(function(e) {
    if ($(window).scrollTop() > 800) {
      $(".single-main aside").addClass("aside-fixed");
      $(".single-body").addClass("body-fixed");
    } else {
      $(".single-main aside").removeClass("aside-fixed");
      $(".single-body").removeClass("body-fixed");
    }
  });
  $(window).scroll(function(e) {
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
  // } else {
  //   // this.props.history.push("/news/page/1");
  // }
  // }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   const id = this.props.match.params.id;
  //   const subcat_name = this.props.match.params.subcat_name;

  //   if (
  //     id !== prevProps.match.params.id ||
  //     subcat_name !== prevProps.match.params.subcat_name
  //   ) {
  //     // if (subcat_name === "page") {
  //     //   this.props.history.push("/news/page/1");
  //     // } else {
  //     this.props.viewNews("news", subcat_name, id);
  //     // }
  //   }
  // }
  // render() {
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
                                    to={`/${tag.tag_slug}/${tag.subtag_slug}`}
                                  >
                                    {tag.subtag_name}
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
                        {/* {singleNews.body} */}
                        <p>
                          <b>
                            Arsenal are not at a crossroads according to
                            director Josh Kroenke in a passionate response to an
                            open letter from fans criticising his father's
                            running of the club.
                          </b>
                        </p>

                        <p>
                          In a combined statement from 14 supporter groups,
                          Arsenal fans told owner Stan Kroenke they felt
                          marginalised and called for the US billionaire to
                          reinvigorate the club.
                        </p>

                        <p>
                          However, speaking on behalf of his father, director
                          Kroenke rejected claims Arsenal desperately needed to
                          restructure in order to achieve long-term success, and
                          said the club already had "developed a modern
                          infrastructure" following Arsene Wenger's departure
                          from the club as manager last summer.
                        </p>

                        <p>
                          Kroenke's statement read: "While we understand,
                          appreciate, and agree with concerns about our club
                          failing to achieve our goal of qualifying for the
                          2019-20 Champions League, we respectfully disagree it
                          is at a crossroads and things need to change because
                          so much change has already occurred.
                        </p>
                        <img
                          src={singleNews.newsMainImg}
                          alt={singleNews.title}
                        />
                        <p>
                          "Over the past year we have turned the page from our
                          traditional model of football operations that included
                          a Manager and CEO, to a new chapter of Arsenal
                          Football Club that is led by a Head of Football and
                          Managing Director.
                        </p>
                        <p>
                          Arsenal are not at a crossroads according to director
                          Josh Kroenke in a passionate response to an open
                          letter from fans criticising his father's running of
                          the club.
                        </p>

                        <p>
                          In a combined statement from 14 supporter groups,
                          Arsenal fans told owner Stan Kroenke they felt
                          marginalised and called for the US billionaire to
                          reinvigorate the club.
                        </p>
                        <p>
                          In a combined statement from 14 supporter groups,
                          Arsenal fans told owner Stan Kroenke they felt
                          marginalised and called for the US billionaire to
                          reinvigorate the club.
                        </p>
                      </div>
                      <div className="related related-bottom">
                        <h4>Related Topics</h4>
                        {singleNews.tags ? (
                          <ul>
                            {singleNews.tags.map((tag, index) => {
                              return (
                                <li key={index} className="category-tag">
                                  <Link
                                    to={`/${tag.tag_slug}/${tag.subtag_slug}`}
                                  >
                                    {tag.subtag_name}
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
                    <TwitterSidebar />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
  // }
};

// const MapStateToProps = ({ newsReducer: state }) => {
//   return {
//     singleNews: state.singleNews,
//     loading: state.loading,
//   };
// };
// export default connect(
//   MapStateToProps,
//   { viewNews }
// )(SingleNews);
export default SingleNews;
