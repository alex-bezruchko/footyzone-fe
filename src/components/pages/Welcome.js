import React from "react";
import loading from "./../../../src/loading.gif";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      posts: [],
      loading: false,
      message: "",
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://footyzone-be.herokuapp.com/api/posts/welcome")
      .then(response => {
        if (response.data) {
          this.setState({ posts: response.data, loading: false, message: "" });
        } else {
          this.setState({
            posts: [],
            loading: false,
            message: "No posts were found",
          });
        }
      })
      .catch(err => {
        this.setState({ message: `${err}`, loading: false, posts: [] });
      });
  }

  componentWillUnmount() {
    this.setState({ loading: false, posts: [], message: "" });
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    const postsLength = this.state.posts.length;
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === postsLength - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const postsLength = this.state.posts.length;
    const nextIndex =
      this.state.activeIndex === 0
        ? postsLength - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const currentPosts = this.state.posts.filter(
      (post, index) => index !== activeIndex
    );

    const slides = this.state.posts.map((post, index) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={index}
        >
          <img src={post.postMainImg} alt={post.title} />
          <CarouselCaption captionText={post.body} captionHeader={post.title} />
        </CarouselItem>
      );
    });

    return (
      <div className="welcome-container">
        {this.state.loading ? (
          <img className="loading" src={loading} alt="Loading gif" />
        ) : (
          <>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                items={this.state.posts}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>

            <div className="small-carousel">
              {currentPosts.map((post, index) => {
                return (
                  <div key={index} className="small-carousel-post">
                    <Link to={`/post/${post.id}`}>
                      <img src={post.postMainImg} alt={post.title} />
                      <p>{post.title}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

// export default Welcome;
export default withRouter(Welcome);
