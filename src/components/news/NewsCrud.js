import React from "react";
import { Button } from "reactstrap";
import loading from "./../../../src/loading.gif";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addNews } from "../../actions/newsActions";
import axios from "axios";
// import { WithContext as ReactTags } from "react-input-tag";
import UsersList from "./../blog/UsersList";

class NewsCrud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {
        title: "",
        summary: "",
        body: "",
        user_id: "",
        published: "",
      },
      newsMainImg: "",
    };
  }

  componentDidMount() {
    const currentUserId = localStorage.getItem("user_id");
    this.setState({
      news: {
        user_id: Number(currentUserId),
      },
    });
  }

  changeHandler = e => {
    this.setState({
      news: {
        ...this.state.news,
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
        this.setState({ newsMainImg: response.data.secure_url });
      })
      .catch(err => {
        this.setState({ newsMainImg: "" });
      });
  };

  imageSubmitHandler = e => {
    e.preventDefault();
  };
  addNewsHandler = e => {
    e.preventDefault();
    let stamp = new Date().toISOString();
    let currentNews = this.state.news;
    let currentImage = this.state.newsMainImg;

    currentNews.published = stamp;
    currentNews.newsMainImg = currentImage;

    this.props.addNews(currentNews, this.props.history);
  };

  render() {
    const { title, body, summary } = this.state.news;

    return (
      <div className="container post-crud">
        {this.props.adding ? (
          <img src={loading} alt="PostForm form is loading" />
        ) : (
          <>
            <div className="col-md-8 post-crud">
              <form onSubmit={this.addNewsHandler}>
                <h2 className="bungee">Add News</h2>

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
                  Latest News
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

const MapStateToProps = ({ newsReducer }) => {
  return {
    newsReducer,
  };
};
export default withRouter(
  connect(
    MapStateToProps,
    { addNews }
  )(NewsCrud)
);
