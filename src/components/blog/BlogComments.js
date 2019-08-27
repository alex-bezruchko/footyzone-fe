import React from "react";
import {
    viewPost,
    addComment,
    deleteComment,
} from "../../actions/postsActions";
import { connect } from "react-redux";
import moment from "moment";

import { FaThumbsUp, FaComments, FaTrashAlt } from "react-icons/fa";


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
                sentComment.post_id = Number(this.props.postsReducer.post.id);
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
                    commentError: false
                });
            }
        }


    };
    componentDidMount() {
        window.scrollTo(0, 0);

        this.setState({
            newComment: {
                user_id: this.props.usersReducer.user.user_id,
                post_id: this.props.postsReducer.post.post_id,
            },
        });
    }

    render() {

        return (
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
                        className="comment-wrapper"
                        onSubmit={this.addCommentHandler}
                    >
                        <div className="comment-form">
                            <textarea
                                placeholder="Add a comment"
                                name="comment"
                                value={this.state.newComment.comment}
                                onChange={this.newCommentOnChange}
                            />
                            {this.state.commentError && <p className="ubuntu">Comment must be at least 10 characters long.</p>}
                        </div>

                        <button className="blue" type="submit">
                            Submit
                                  </button>
                    </form>
                </div>

            </ >
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
