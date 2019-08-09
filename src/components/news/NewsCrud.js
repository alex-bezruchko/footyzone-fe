import React from "react";
import loading from "./../../../src/loading.gif";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UsersList from "./../blog/UsersList";
import { addNews } from "../../actions/newsActions";
import axios from "axios";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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
      suggestions: [],
      tags: [],
      newTags: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }
  handleAddition(tag) {
    this.setState(state => ({
      tags: [...state.tags, tag],
    }));
    let stateSuggestions = this.state.suggestions;
    let isUnique = false;
    for (let s=0; s < stateSuggestions.length; s++) {
      // console.log(stateSuggestions[s].text)
        // console.log(tag.text)
        if (stateSuggestions[s].text === tag.text) {
        
        // console.log(stateSuggestions[s].text)
        // console.log(tag.text)

        isUnique = false;
        break;
      } else {
        isUnique = true;
      }
      // return isUnique;
    }
    if (isUnique) {
      let newTag = tag;
      this.setState(state => ({
        newTags: [...state.newTags, newTag],
      }));
    }
    
  }
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  componentDidMount() {
    const currentUserId = localStorage.getItem("user_id");
    this.setState({
      news: {
        user_id: Number(currentUserId),
      },
    });
    axios
      .get("https://footyzone-be.herokuapp.com/api/news/tags")
      .then(response => {
        // console.log(response)
        let currentSuggestions = [];
        for (let i = 0; i < response.data.length; i++) {
          let tagObject = {};
          // console.log(response.data[i])
          tagObject.id = response.data[i].tag_name;
          tagObject.text = response.data[i].tag_name;
          // tagObject.text = response.data[i].subtag_name;
          currentSuggestions.push(tagObject);
        }
        // console.log(currentSuggestions)
        this.setState({
          suggestions: currentSuggestions,
        });
      })
      .catch(err => {
        // this.setState({
        //   suggestions: [],
        // });
      });
    // console.log(this.state)
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
        this.setState({
          newsMainImg: response.data.secure_url,
        });
      })
      .catch(err => {
        this.setState({
          newsMainImg: "",
        });
      });
  };

  imageSubmitHandler = e => {
    e.preventDefault();
  };
  addNewsHandler = e => {
    e.preventDefault();
    const stateNewTags = this.state.newTags;
    let updatedTags = [];
    for (let u = 0; u < stateNewTags.length; u++) {
      let polishedTag = {};
      polishedTag.tag_slug = stateNewTags[u].text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
      polishedTag.tag_name = stateNewTags[u].text;
      updatedTags.push(polishedTag)
    }

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: "M7938KD1Akyo8XBTmf7jF68jiHA",
    };
    let processedTags = [];
    axios
      .post(
        "https://footyzone-be.herokuapp.com/api/news/tags",
        updatedTags,
        headers
      )
      .then(response => {
        console.log(response.data);
       processedTags = response.data;
      })
      .catch(err => {
        console.log(err);
      });

    let stamp = new Date().toISOString();
    let currentNews = this.state.news;
    let tags = processedTags;
    let currentImage = this.state.newsMainImg;
    let polishedTags = [];
    tags.map(tag => {
      let fixedTag = {};
      fixedTag.id = tag.id;
      fixedTag.tag_slug = tag.text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
      fixedTag.tag_name = tag.text;
      polishedTags.push(fixedTag);
      return polishedTags;
    });
    console.log(polishedTags)
    currentNews.published = stamp;
    currentNews.newsMainImg = currentImage;
    currentNews.tags = polishedTags;
    // console.log(currentNews)
    this.props.addNews(currentNews, this.props.history);
  };

  render() {
    const { title, body, summary } = this.state.news;
    const { tags, suggestions } = this.state;

    return (
      <div className="container post-crud">
        {" "}
        {this.props.adding ? (
          <img src={loading} alt="PostForm form is loading" />
        ) : (
          <>
            <div className="col-md-8 post-crud">
              <form onSubmit={this.addNewsHandler}>
                <h2 className="bungee"> Add News </h2>
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
                />{" "}
                <textarea
                  placeholder="Body"
                  className="input-group"
                  name="body"
                  onChange={this.changeHandler}
                  type="text"
                  value={body}
                />
                {suggestions && suggestions.length > 0 ? (
                  <>
                    <h3 className="bungee"> Tags </h3>{" "}
                    <ReactTags
                      tags={tags}
                      suggestions={suggestions}
                      // handleDrag={this.handleDrag}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      allowDragDrop={false}
                      inputFieldPosition="top"
                      delimiters={delimiters}
                    />{" "}
                  </>
                ) : (
                  <></>
                )}{" "}
                <button className="blue" type="submit">
                  Post News{" "}
                </button>{" "}
              </form>{" "}
            </div>{" "}
            <UsersList />
          </>
        )}{" "}
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
    {
      addNews,
    }
  )(NewsCrud)
);
