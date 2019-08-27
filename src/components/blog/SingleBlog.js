import React from "react";
import {
  viewPost,
  addComment,
  deleteComment,
} from "../../actions/postsActions";
import { connect } from "react-redux";
import loading from "./../../../src/loading.gif";
import BlogSocials from "./BlogSocials";
import BlogComments from "./BlogComments";


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
    if (this.state.newComment.comment && this.state.newComment.comment.length > 10) {
      this.setState({
        commentError: false
      });
    }
  };
  addCommentHandler = e => {
    e.preventDefault();
    this.setState({
      commentError: false
    })
    let stateComment = this.state.newComment;
    if (stateComment) {
      if (stateComment.comment === undefined) {
        this.setState({
          commentError: true
        })
      } else if (stateComment.comment.length < 10) {
        this.setState({
          commentError: true
        })
      } else {
        let sentComment = {};
        sentComment.post_id = Number(this.props.match.params.id);
        sentComment.user_id = Number(this.state.newComment.user_id);
        sentComment.date = new Date().toISOString();
        sentComment.comment = this.state.newComment.comment;
        console.log(this.state.newComment.comment)

        this.props.addComment(sentComment, this.props.history);
        this.setState({
          newComment: {
            comment: "",
            user_id: sentComment.user_id,
            post_id: sentComment.post_id,
            date: "",
          },
          commentError: false
        });
      }
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
      <div className="container-row blog" >
        {/* <img src={stadium} alt="shiny photoshopped stadium" className="blog-bg" /> */}

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
                      className="col-md-8-img"
                    // className="article-cover"
                    />
                    <div className="single-info">
                      <BlogSocials props={this.props} />
                      <img
                        className="avatar"
                        src={this.props.postsReducer.post.avatar}
                        alt="avatar"
                      />
                    </div>
                    <div className="body">
                      <p>{this.props.postsReducer.post.body}</p>
                    </div>
                    <hr />

                    <div className="comments">
                      <div>
                        {this.props.postsReducer.post.likes &&
                          this.props.postsReducer.comments ? (
                            <>
                              <BlogComments props={this.props} />
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
      </div >
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
