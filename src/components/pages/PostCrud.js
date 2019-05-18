import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
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
        postMainImg: "",
        user_id: null,
        category: null,
      },
    };
  }

  componentDidMount() {
    this.setState({});
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addPostHandler = e => {
    e.preventDefault();
    this.props.addPost(this.state.post);
  };

  render() {
    return (
      <div className="form post-crud">
        <h1>Add Post</h1>

        {this.props.adding ? (
          <img src={loading} alt="PostForm form is loading gif" />
        ) : (
          <FormGroup onClick={this.addPostHandler}>
            <Input
              placeholder="Title"
              type="text"
              value={this.state.post.title}
              onChange={this.changeHandler}
            />
            <Input
              placeholder="Summary"
              type="textarea"
              row="40"
              value={this.state.post.summary}
              onChange={this.changeHandler}
            />
            <Input
              placeholder="Body"
              type="textarea"
              row="40"
              value={this.state.post.body}
              onChange={this.changeHandler}
            />

            <Button color="success" type="submit">
              Send
            </Button>
          </FormGroup>
        )}
      </div>
    );
  }
}

const MapStateToProps = ({ usersReducer: state }) => {
  return {
    post: state.post,
    adding: state.adding,
  };
};
export default withRouter(
  connect(
    MapStateToProps,
    { addPost }
  )(PostCrud)
);
