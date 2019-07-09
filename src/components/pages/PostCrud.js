import React from "react";
import { Input, Button } from "reactstrap";
import loading from "./../../../src/loading.gif";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPost } from "../../actions/postsActions";

class PostCrud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "",
        summary: "",
        body: "",
        user_id: null,
        category: "",
      },
      postMainImg: null,
    };
  }

  componentDidMount() {
    const currentUserId = localStorage.getItem("user_id");
    this.setState({
      post: {
        user_id: currentUserId,
      },
    });
  }

  changeHandler = e => {
    this.setState({
      post: {
        [e.target.name]: e.target.value,
      },
    });
  };

  imageHandler = e => {
    e.preventDefault();
    this.setState({
      postMainImg: e.target.files[0],
    });
    console.log(this.state.postMainImg);
  };

  addPostHandler = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append(
      "postMainImg",
      this.state.postMainImg,
      this.state.postMainImg.name
    );
    this.props.addPost(this.state.post, this.props.history, fd);
  };

  render() {
    return (
      <div className="form post-crud">
        <h1>Add Post</h1>

        {this.props.adding ? (
          <img src={loading} alt="PostForm form is loading gif" />
        ) : (
          <form onSubmit={this.addPostHandler}>
            <Input
              placeholder="Title"
              name="title"
              type="text"
              value={this.state.post.title}
              onChange={this.changeHandler}
            />
            <Input type="file" onChange={this.imageHandler} />
            <Input
              placeholder="Summary"
              name="summary"
              type="textarea"
              value={this.state.post.summary}
              onChange={this.changeHandler}
            />
            <Input
              placeholder="Body"
              name="body"
              type="textarea"
              value={this.state.post.body}
              onChange={this.changeHandler}
            />

            <Button color="success" type="submit">
              Add Post
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const MapStateToProps = ({ postsReducer: state }) => {
  return {
    adding: state.adding,
    post: state.post,
  };
};
export default withRouter(
  connect(
    MapStateToProps,
    { addPost }
  )(PostCrud)
);
