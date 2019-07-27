import React from "react";
import { viewPost } from "../../actions/postsActions";
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

class SingleView extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    const id = this.props.match.params.id;
    this.props.viewPost("blog", id);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const id = this.props.match.params.id;

    if (id !== prevProps.match.params.id) {
      this.props.viewPost("blog", id);
    }
  }
  render() {
    return (
      <div className="container-row blog">
        {this.props.loading ? (
          <div className="container">
            <img className="loading" src={loading} alt="Post is loading gif" />
          </div>
        ) : (
          <div className="container single-blog-wrapper">
            {this.props.post && (
              <div className="single col-md-8">
                {" "}
                <h2>{this.props.post.title}</h2>
                <img
                  src={this.props.post.postMainImg}
                  alt={this.props.post.title}
                  className="blog-main-image"
                />
                <div className="single-info">
                  <div className="single-share">
                    <div className="socials">
                      <FacebookShareButton
                        url={window.location.href}
                        media={this.props.post.title}
                        className="button"
                      >
                        <FacebookIcon size={32} round={false} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={window.location.href}
                        media={this.props.post.title}
                        className="button"
                      >
                        <TwitterIcon size={32} round={false} />
                      </TwitterShareButton>
                      <PinterestShareButton
                        url={window.location.href}
                        media={this.props.post.title}
                        className="button"
                      >
                        <PinterestIcon size={32} round={false} />
                      </PinterestShareButton>
                      <WhatsappShareButton
                        url={window.location.href}
                        media={this.props.post.title}
                        className="button"
                      >
                        <WhatsappIcon size={32} round={false} />
                      </WhatsappShareButton>
                      <RedditShareButton
                        url={window.location.href}
                        media={this.props.post.title}
                        className="button"
                      >
                        <RedditIcon size={32} round={false} />
                      </RedditShareButton>
                    </div>
                    <div className="author">
                      Submitted by: {this.props.post.username} on{" "}
                      {new Date(this.props.post.published).toDateString()}
                    </div>
                  </div>
                  <img
                    className="avatar"
                    src={this.props.post.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="body">{this.props.post.body}</div>
                <div className="body">
                  <p>{this.props.post.body}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProps = ({ postsReducer: state }) => {
  return {
    post: state.post,
    loading: state.loading,
  };
};
export default connect(
  MapStateToProps,
  { viewPost }
)(SingleView);
