import React from "react";
import {
  viewPost,
  addComment,
  deleteComment,
} from "../../actions/postsActions";
import { connect } from "react-redux";
// import Tr from "react-icons/fa";
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
import { FaThumbsUp, FaComments, FaTrashAlt, FaPrint, FaCalendar } from "react-icons/fa";

class SingleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        comment: "",
        user_id: "",
        post_id: "",
      },
      commentError: false,
    };
  }
  submitCommentHandler = e => {
    e.preventDefault();
    this.setState({
      newComment: {
        comment: "",
      },
    });
  };

  newCommentOnChange = e => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        [e.target.name]: e.target.value,
      },
    });
  };
  addCommentHandler = e => {
    e.preventDefault();

    if (this.state.newComment.user_id) {
      let sentComment = {};
      sentComment.post_id = Number(this.props.match.params.id);
      sentComment.user_id = Number(this.state.newComment.user_id);
      sentComment.date = new Date().toISOString();
      sentComment.comment = this.state.newComment.comment;
      this.props.addComment(sentComment, this.props.history);
      this.setState({
        newComment: {
          comment: "",
          user_id: sentComment.user_id,
          post_id: sentComment.post_id,
          date: "",
        },
      });
    }
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    this.props.viewPost("blog", id);

    this.setState({
      newComment: {
        user_id: this.props.usersReducer.user.user_id,
        post_id: this.props.postsReducer.post.post_id,
      },
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const id = this.props.match.params.id;

    if (id !== prevProps.match.params.id) {
      window.scrollTo(0, 0);

      this.props.viewPost("blog", id);
      this.setState({
        newComment: {
          user_id: this.props.usersReducer.user.user_id,
          post_id: this.props.postsReducer.post.post_id,
        },
      });
    }
  }
  render() {
    return (
      <div className="container-row blog">
        {this.props.postsReducer.loading ? (
          <div className="container">
            <img className="loading" src={loading} alt="Post is loading" />
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
                      className="article-cover"
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
                          <FaPrint /> Submitted by <b>{this.props.postsReducer.post.username}</b>
                          <br></br>
                          <FaCalendar /> on {" "}
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
                          this.props.postsReducer.comments ? (
                            <>
                              <div className="post-interaction">
                                <h4>
                                  <FaComments /> (
                            {this.props.postsReducer.comments.length})
                          </h4>
                                <div className="likes">
                                  <FaThumbsUp />{" "}
                                  {this.props.postsReducer.post.likes.length}
                                </div>
                              </div>
                              <hr className="comment-separator" />{" "}
                              {this.props.postsReducer.comments.length > 0 ? (
                                <>
                                  {this.props.postsReducer.comments.map(
                                    (comment, index) => {
                                      return (
                                        <div className="comment-body" key={index}>
                                          <div className="comment-avatar">
                                            {comment.avatar &&
                                              comment.avatar.length > 0 ? (
                                                <img
                                                  src={comment.avatar}
                                                  alt="user avatar"
                                                />
                                              ) : (
                                                <img
                                                  src="https://res.cloudinary.com/htg1iqq1p/image/upload/v1564598526/fwwckvx64nj7tjzxiyne.png"
                                                  alt="user avatar"
                                                />
                                              )}

                                            <span>{comment.username}</span>
                                          </div>
                                          <div className="comment-text">
                                            <p>{comment.comment}</p>
                                            <div className="delete-comment">
                                              <span>
                                                {moment(comment.date).format("lll")}
                                              </span>
                                              {Number(
                                                this.props.usersReducer.user.user_id
                                              ) === Number(comment.user_id) ? (
                                                  <button
                                                    onClick={() =>
                                                      this.props.deleteComment(
                                                        comment.id,
                                                        this.props.postsReducer.post.id
                                                      )
                                                    }
                                                  >
                                                    <FaTrashAlt />
                                                  </button>
                                                ) : null}
                                            </div>
                                          </div>
                                          <hr />
                                        </div>
                                      );
                                    }
                                  )}{" "}
                                </>
                              ) : null}
                              <div className="new-comment">
                                <div className="commentator">
                                  {this.props.usersReducer.user.avatar &&
                                    this.props.usersReducer.user.avatar.length > 0 ? (
                                      <img
                                        src={this.props.usersReducer.user.avatar}
                                        alt="user avatar"
                                      />
                                    ) : (
                                      <img
                                        src="https://res.cloudinary.com/htg1iqq1p/image/upload/v1564598526/fwwckvx64nj7tjzxiyne.png"
                                        alt="user avatar"
                                      />
                                    )}
                                  <span>{this.props.usersReducer.user.username}</span>
                                </div>
                                <form
                                  className="comment-form"
                                  onSubmit={this.addCommentHandler}
                                >
                                  <textarea
                                    placeholder="Add a comment"
                                    name="comment"
                                    value={this.state.newComment.comment}
                                    onChange={this.newCommentOnChange}
                                  />
                                  <button className="blue" type="submit">
                                    Submit
                            </button>
                                </form>
                              </div>
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
  { viewPost, addComment, deleteComment }
)(SingleView);
