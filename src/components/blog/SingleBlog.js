import React from "react";
import { viewPost } from "../../actions/postsActions";
import { connect } from "react-redux";
import loading from "./../../../src/loading.gif";
import moment from "moment";
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
import { FaThumbsUp, FaComments } from "react-icons/fa";
class SingleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        message: "",
        user_id: "",
        post_id: "",
      },
      commentError: false,
    };
  }
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
    console.log(this.props);
    return (
      <div className="container-row blog">
        {this.props.postsReducer.loading ? (
          <div className="container">
            <img className="loading" src={loading} alt="Post is loading gif" />
          </div>
        ) : (
          <div className="container single-blog-wrapper">
            {this.props.postsReducer.post &&
            this.props.postsReducer.post.title ? (
              <div className="single col-md-8">
                {" "}
                <h2>{this.props.postsReducer.post.title}</h2>
                <img
                  src={this.props.postsReducer.post.postMainImg}
                  alt={this.props.postsReducer.post.title}
                  className="blog-main-image"
                />
                <div className="single-info">
                  <div className="single-share">
                    <div className="socials">
                      {this.props.postsReducer.post.title &&
                      this.props.postsReducer.post.title.length > 0 ? (
                        <>
                          <FacebookShareButton
                            url={window.location.href}
                            media={this.props.postsReducer.post.title}
                            className="button"
                          >
                            <FacebookIcon size={32} round={false} />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={window.location.href}
                            media={this.props.postsReducer.post.title}
                            className="button"
                          >
                            <TwitterIcon size={32} round={false} />
                          </TwitterShareButton>
                          <PinterestShareButton
                            url={window.location.href}
                            media={this.props.postsReducer.post.title}
                            className="button"
                          >
                            <PinterestIcon size={32} round={false} />
                          </PinterestShareButton>
                          <WhatsappShareButton
                            url={window.location.href}
                            media={this.props.postsReducer.post.title}
                            className="button"
                          >
                            <WhatsappIcon size={32} round={false} />
                          </WhatsappShareButton>
                          <RedditShareButton
                            url={window.location.href}
                            media={this.props.postsReducer.post.title}
                            className="button"
                          >
                            <RedditIcon size={32} round={false} />
                          </RedditShareButton>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="author">
                      Submitted by: {this.props.postsReducer.post.username} on{" "}
                      {new Date(
                        this.props.postsReducer.post.published
                      ).toDateString()}
                    </div>
                  </div>
                  <img
                    className="avatar"
                    src={this.props.postsReducer.post.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="body">{this.props.postsReducer.post.body}</div>
                <div className="body">
                  <p>{this.props.postsReducer.post.body}</p>
                </div>
                <hr />
                <div className="comments">
                  <div>
                    {this.props.postsReducer.post.likes &&
                    this.props.postsReducer.post.comments ? (
                      <>
                        <div className="post-interaction">
                          <h4>
                            <FaComments /> (
                            {this.props.postsReducer.post.comments.length})
                          </h4>
                          <div className="likes">
                            <FaThumbsUp />{" "}
                            {this.props.postsReducer.post.likes.length}
                          </div>
                        </div>
                        <hr className="comment-separator" />{" "}
                        {this.props.postsReducer.post.comments.map(comment => {
                          return (
                            <div className="comment-body" key={comment.id}>
                              <div className="comment-avatar">
                                <img src={comment.avatar} />
                                <span>{comment.username}</span>
                              </div>
                              <div className="comment-text">
                                {comment.comment}
                                <span>
                                  {moment(comment.date).format("lll")}
                                </span>
                              </div>
                              <hr />
                            </div>
                          );
                        })}
                        <form className="comment-form">
                          <img
                            src="https://res.cloudinary.com/htg1iqq1p/image/upload/v1563589016/vaeq5qshowwit6iubhxm.png"
                            alt="currentUser"
                          />
                          {this.props.usersReducer.user.username}
                          <textarea placeholder="Add a comment" />
                          <button>Submit</button>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProps = ({ postsReducer, usersReducer }) => {
  return {
    postsReducer,
    usersReducer,
  };
};
export default connect(
  MapStateToProps,
  { viewPost }
)(SingleView);
