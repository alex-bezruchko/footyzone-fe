import React from "react";
import { Button } from "reactstrap";
import loading from "./../../../src/loading.gif";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPost } from "../../actions/postsActions";
import axios from "axios";
import UsersList from "./../blog/UsersList";

class PostCrud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "",
        summary: "",
        body: "",
        user_id: "",
        published: "",
      },
      postMainImg: "",
    };
  }

  componentDidMount() {
    const currentUserId = localStorage.getItem("user_id");
    this.setState({
      post: {
        user_id: Number(currentUserId),
      },
    });
  }

  changeHandler = e => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value,
      },
    });
  };

  imageFileHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    let file = e.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", "sm7zid93");
    formData.append("api_key", "915419188456665");

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: "M7938KD1Akyo8XBTmf7jF68jiHA",
    };
    axios
      .post(
        "https://api.cloudinary.com/v1_1/htg1iqq1p/upload",
        formData,
        headers
      )
      .then(response => {
        this.setState({ postMainImg: response.data.secure_url });
      })
      .catch(err => {
        this.setState({ postMainImg: "" });
      });
  };

  imageSubmitHandler = e => {
    e.preventDefault();
  };
  addPostHandler = e => {
    e.preventDefault();
    let stamp = new Date().toISOString();
    let currentPost = this.state.post;
    let currentImage = this.state.postMainImg;

    currentPost.published = stamp;
    currentPost.postMainImg = currentImage;

    this.props.addPost(currentPost, this.props.history);
  };

  render() {
    const { title, body, summary } = this.state.post;

    return (
      <div className="container post-crud">
        {this.props.adding ? (
          <img src={loading} alt="PostForm form is loading" />
        ) : (
          <>
            <div className="col-md-8 post-crud">
              <form onSubmit={this.addPostHandler}>
                <h2 className="bungee">Add Post</h2>

                <input
                  placeholder="Title"
                  name="title"
                  type="text"
                  onChange={this.changeHandler}
                  className="input-group"
                  value={title}
                />

                <input
                  id="file-upload"
                  onChange={this.imageFileHandler}
                  type="file"
                  name="file"
                />
                <input
                  placeholder="Summary"
                  className="input-group"
                  name="summary"
                  onChange={this.changeHandler}
                  type="text"
                  value={summary}
                />
                <textarea
                  placeholder="Body"
                  className="input-group"
                  name="body"
                  onChange={this.changeHandler}
                  type="text"
                  value={body}
                />

                <button className="blue" type="submit">
                  Add Post
                </button>
              </form>
            </div>
            <UsersList />
          </>
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
