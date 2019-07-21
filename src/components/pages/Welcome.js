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
      news: [],
      loading: false,
      message: "",
      summary:
        "However, speaking on behalf of his father, director Kroenke rejected claims Arsenal desperately needed to restructure in order to achieve long-term success, and said the club already had 'developed a modern infrastructure' following Arsene Wenger's departure.",
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({ loading: true });
    axios
      .get("https://footyzone-be.herokuapp.com/api/news/welcome")
      .then(response => {
        if (response.data) {
          this.setState({ news: response.data, loading: false, message: "" });
        } else {
          this.setState({
            news: [],
            loading: false,
            message: "No news were found",
          });
        }
      })
      .catch(err => {
        this.setState({ message: `${err}`, loading: false, news: [] });
      });
  }

  componentWillUnmount() {
    this.setState({ loading: false, news: [], message: "" });
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    const newsLength = this.state.news.length;
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === newsLength - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const newsLength = this.state.news.length;
    const nextIndex =
      this.state.activeIndex === 0
        ? newsLength - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const currentNews = this.state.news.filter(
      (news, index) => index !== activeIndex
    );

    const slides = this.state.news.map((news, index) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={index}
        >
          <div className="news-image">
            <Link to={`/news/${news.subcat_slug}/${news.id}`}>
              <img src={news.newsMainImg} alt={news.title} />
            </Link>
          </div>
          {/* <h1>Latest</h1> */}
          <CarouselCaption
            captionText={this.state.summary}
            captionHeader={news.title}
          />
        </CarouselItem>
      );
    });

    return (
      <div className="welcome-container container-row">
        {this.state.loading ? (
          <img className="loading" src={loading} alt="Loading gif" />
        ) : (
          <div className="container carousel-container">
            <h1 className="latest">Latest</h1>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              interval={30000000}
            >
              <CarouselIndicators
                items={this.state.news}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              <div className="controllers">
                <div className="wrapper">
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
                </div>
              </div>
            </Carousel>

            <div className="small-carousel">
              {currentNews.map((news, index) => {
                return (
                  <div key={index} className="small-carousel-post">
                    <div className="post-wrapper">
                      <Link to={`/news/${news.subcat_slug}/${news.id}`}>
                        <img src={news.newsMainImg} alt={news.title} />
                      </Link>
                    </div>
                    <p>{news.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

// export default Welcome;
export default withRouter(Welcome);
