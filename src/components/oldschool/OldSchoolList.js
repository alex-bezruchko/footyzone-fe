import React from "react";
import axios from "axios";
import imgLoading from "./../../../src/loading.gif";
import $ from "jquery";
import _ from "lodash";

import { Throttle } from "react-throttle";
import {
  FaRegNewspaper,
} from "react-icons/fa";
import { Link } from "react-router-dom";

class OldSchoolList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      cart: [],
      initLoading: false,
      moreLoading: false,
      counter: 0,
      current_height: 200
    }
    this.fetchMore = this.fetchMore.bind(this);

  }

  loadOldSchool() {
    this.setState({ initLoading: true });
    axios
      .get("https://footyzone-be.herokuapp.com/api/old-school")
      .then(response => {
        if (response.data) {
          let newCart = [];
          newCart.push(response.data[0]);
          this.setState({
            news: response.data,
            initLoading: false,
            cart: newCart,
            counter: 1
          });
        } else {
          this.setState({
            news: [],
            initLoading: false,
            cart: [],
            counter: 0
          });
        }
      })
      .catch(err => {
        this.setState({
          news: [],
          initLoading: false,
          cart: [],
          counter: 0
        });
      });
  }

  componentDidMount() {

    this.loadOldSchool();

    // MOBILE / DESKTOP EDGECASE FOR SIDEBAR FIX/RELATIVE POSITIONS
    let client = document.getElementsByTagName("section");

    if (client[0] && client[0].clientWidth > 992) {
      let element = document.getElementsByClassName("popular");
      $.when(element).then(function () {
        let width = element[0].clientWidth;
        $(".popular").css("width", width);
        $(".popular .twitter-fixed").css("width", width);
      });
    } else {
      $(".popular").css("min-width", "100%");
      $(".popular .twitter-fixed").css("min-width", "100%");
    }


    // NEWSLIST SIDEBAR FIX/RELATIVE POSITION EDGECASE ON SCROLL

    $(window).scroll(function (e) {
      let article = document.getElementsByClassName("news-list");

      if (article[0]) {
        let height = article[0].clientHeight;
        if (
          $(window).scrollTop() > 150 &&
          $(window).scrollTop() < (height * 8.5) / 10
        ) {
          $(".col-md-4 .popular").addClass("twitter-fixed");
        } else {
          $(".col-md-4 .popular").removeClass("twitter-fixed");
        }
      }

    });
    $(window).on("scroll", _.throttle(this.fetchMore, 1750))


  }

  fetchMore() {
    // console.log(h)
    let scrollTop = $(window).scrollTop()
    let currentCount = this.state.counter;
    let height = this.state.current_height;
    // if ()
    let currentCart = [];
    let currentNews = [];
    if (this.state) {
      currentCart = this.state.cart;
      currentNews = this.state.news
    }
    console.log(scrollTop)
    console.log(this.state.counter)
    if (height < scrollTop) {
      this.setState({
        moreLoading: true,
        counter: currentCount + 1,
        current_height: scrollTop
      })

      // if ((this.state.current_height && scrollTop) && (this.state.current_height < scrollTop)) {



      // height = scrollTop;
      // setCounter(newCounter)
      if ((currentCart && currentCart.length > 0) && (currentNews && currentNews.length > 0)) {
        // let currentCart = this.state.cart;

        // let allNews = this.state.news;
        let link = document.createElement("A");
        let h2 = document.createElement("H2");
        let img = document.createElement("IMG");
        let div = document.createElement("DIV");


        let list = document.getElementsByClassName('category-news');

        if (list[0] && link) {
          console.log(list[0])
          console.log(link)

          if (currentNews && currentNews.length > 0 && (currentNews.length - 1 > this.state.counter)) {
            link.href = `/news/${currentNews[this.state.counter].subcat_slug}/${currentNews[this.state.counter].id}`;
            h2.innerText = currentNews[this.state.counter].title;
            img.src = currentNews[this.state.counter].newsMainImg;
            div.innerText = currentNews[this.state.counter].body.slice(0, 250).concat('...');
            div.className = "body";
            link.appendChild(h2)
            link.appendChild(img)
            link.appendChild(div)
            list[0].appendChild(link)
            currentCart.push(currentNews[this.state.counter])
            // console
            this.setState({
              moreLoading: false,
              // current_height: scrollTop
            })

          };
        }
      }
    }
  }



  // }
  // })
  render() {


    console.log(this.state.cart)
    let maxLenBody = 250;
    return (
      <div className="container-row news">
        {this.state.initLoading ? (
          <div className="container blog-list">
            <div className="col-md-8">
              <img className="loading" alt="Loading gif" src={imgLoading} />
            </div>
          </div>
        ) : (
            // <Throttle handler="onScroll">
            <div onScroll={this.fetchMore} className="container-row">
              <div className="news-list container">
                <h1 className="category-header">Latest <FaRegNewspaper /> </h1>
                <div className="col-sm-12 col-md-8">
                  {this.state.news.length > 0 ? (
                    <div className="list-wrapper">
                      <div className="category-news">

                        <Link to={`/news/${this.state.news[0].subcat_slug}/${this.state.news[0].id}`}>
                          <h2>{this.state.news[0].title}</h2>
                          <img
                            className="col-md-8-img"
                            src={this.state.news[0].newsMainImg}
                            alt=""
                          />
                          <div className="body">{this.state.news[0].body.slice(0, maxLenBody).concat('...')}</div>
                        </Link>
                        {this.state.moreLoading ? (
                          <div className="container blog-list">
                            <div className="col-md-8">
                              <img className="loading" alt="Loading gif" src={imgLoading} />
                            </div>
                          </div>
                        ) : (<></>)}
                      </div>


                    </div>
                  ) : (
                      <></>
                    )}
                </div>
                <div className="col-md-4 col-xs-12">
                  <div className="popular">
                    {/* <PopularNews /> */}
                  </div>
                </div>
              </div>

            </div>
            // </Throttle>
          )}
      </div>
    );
  }
}
export default OldSchoolList;












