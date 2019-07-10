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

class Post extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.viewPost(id);
    console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const id = this.props.match.params.id;

    if (id !== prevProps.match.params.id) {
      this.props.viewPost(id);
    }
  }
  render() {
    return (
      <div className="container post">
        {this.props.loading ? (
          <img src={loading} alt="Post is loading gif" />
        ) : (
          <div className="card">
            <h1>{this.props.post.title}</h1>
            <img
              src={this.props.post.postMainImg}
              alt={this.props.post.title}
            />
            <div className="socials">
              <FacebookShareButton
                url={window.location.href}
                quote={this.props.post.title}
                className="button"
              >
                <FacebookIcon size={32} round={false} />
              </FacebookShareButton>
              <TwitterShareButton
                url={window.location.href}
                quote={this.props.post.title}
                className="button"
              >
                <TwitterIcon size={32} round={false} />
              </TwitterShareButton>
              <PinterestShareButton
                url={window.location.href}
                quote={this.props.post.title}
                className="button"
              >
                <PinterestIcon size={32} round={false} />
              </PinterestShareButton>
              <WhatsappShareButton
                url={window.location.href}
                quote={this.props.post.title}
                className="button"
              >
                <WhatsappIcon size={32} round={false} />
              </WhatsappShareButton>
              <RedditShareButton
                url={window.location.href}
                quote={this.props.post.title}
                className="button"
              >
                <RedditIcon size={32} round={false} />
              </RedditShareButton>
            </div>
            <div className="author">
              Submitted by: {this.props.post.username} on{" "}
              {this.props.post.published}
            </div>
            <div className="body">{this.props.post.body}</div>
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
)(Post);
