import React from "react";
import { viewNews } from "../../actions/newsActions";
import { connect } from "react-redux";
import loading from "./../../../src/loading.gif";
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
    const id = this.props.match.params.id;
    const subcat_name = this.props.match.params.subcat_name;
    console.log();
    this.props.viewNews("news", subcat_name, id);
    console.log(this.props);
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
      <div className="container post">
        {this.props.loading ? (
          <img src={loading} alt="Post is loading gif" />
        ) : (
          <div className="card">
            {this.props.singleNews && (
              <>
                {" "}
                <h1>{this.props.singleNews.title}</h1>
                <img
                  src={this.props.singleNews.newsMainImg}
                  alt={this.props.singleNews.title}
                />
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
                <div className="author">
                  Submitted by: {this.props.singleNews.username} on{" "}
                  {new Date(this.props.singleNews.published).toDateString()}
                </div>
                <div className="body">{this.props.singleNews.body}</div>
              </>
            )}
          </div>
        )}
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
