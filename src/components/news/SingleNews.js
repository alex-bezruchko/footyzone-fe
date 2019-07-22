import React from "react";
import { viewNews } from "../../actions/newsActions";
import { connect } from "react-redux";
import loading from "./../../../src/loading.gif";
import $ from "jquery";

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

class SingleNews extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    const id = this.props.match.params.id;
    const subcat_name = this.props.match.params.subcat_name;
    this.props.viewNews("news", subcat_name, id);
    $(window).scroll(function(e) {
      if ($(window).scrollTop() > 800) {
        $(".single-main aside").addClass("aside-fixed");
        $(".single-body").addClass("body-fixed");
      } else {
        $(".single-main aside").removeClass("aside-fixed");
        $(".single-body").removeClass("body-fixed");
      }
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const id = this.props.match.params.id;
    const subcat_name = this.props.match.params.subcat_name;

    if (
      id !== prevProps.match.params.id ||
      subcat_name !== prevProps.match.params.subcat_name
    ) {
      this.props.viewNews("news", subcat_name, id);
    }
  }
  render() {
    return (
      <div className="container-row news">
        <div className="container single-news-wrapper">
          {this.props.loading ? (
            <img src={loading} alt="Post is loading gif" />
          ) : (
            <>
              {this.props.singleNews && (
                <div className="col-md-8 col-xs-12 single-news">
                  <div className="single-header">
                    {" "}
                    <h2>{this.props.singleNews.title}</h2>
                    <div className="author">
                      <p>
                        Submitted on{" "}
                        {new Date(
                          this.props.singleNews.published
                        ).toDateString()}
                      </p>
                      <img alt="author" src={this.props.singleNews.avatar} />
                    </div>
                    <img
                      src={this.props.singleNews.newsMainImg}
                      alt={this.props.singleNews.title}
                    />
                  </div>
                  <div className="single-main">
                    <aside>
                      <div className="socials">
                        <FacebookShareButton
                          url={window.location.href}
                          media={this.props.singleNews.title}
                          className="button"
                        >
                          <FacebookIcon size={32} round={false} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={window.location.href}
                          media={this.props.singleNews.title}
                          className="button"
                        >
                          <TwitterIcon size={32} round={false} />
                        </TwitterShareButton>
                        <PinterestShareButton
                          url={window.location.href}
                          media={this.props.singleNews.title}
                          className="button"
                        >
                          <PinterestIcon size={32} round={false} />
                        </PinterestShareButton>
                        <WhatsappShareButton
                          url={window.location.href}
                          media={this.props.singleNews.title}
                          className="button"
                        >
                          <WhatsappIcon size={32} round={false} />
                        </WhatsappShareButton>
                        <RedditShareButton
                          url={window.location.href}
                          media={this.props.singleNews.title}
                          className="button"
                        >
                          <RedditIcon size={32} round={false} />
                        </RedditShareButton>
                      </div>
                      <div className="related">
                        <ul>
                          Related Topics
                          <li>Manchester United</li>
                          <li>EPL</li>
                          <li>Transfers</li>
                          <li>De Gea</li>
                        </ul>
                      </div>
                    </aside>
                    <div className="single-body">
                      <div className="body">
                        {/* {this.props.singleNews.body} */}
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
                          src={this.props.singleNews.newsMainImg}
                          alt={this.props.singleNews.title}
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
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const MapStateToProps = ({ newsReducer: state }) => {
  return {
    singleNews: state.singleNews,
    loading: state.loading,
  };
};
export default connect(
  MapStateToProps,
  { viewNews }
)(SingleNews);
