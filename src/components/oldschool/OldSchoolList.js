import React from "react";
import axios from "axios";
import imgLoading from "./../../../src/loading.gif";
import bricks from "./../../img/blog.jpg";

import $ from "jquery";
import _ from "lodash";
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
      counter: 1,
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
          newCart.push(response.data[1]);
          this.setState({
            news: response.data,
            initLoading: false,
            cart: newCart,
            counter: 2
          });
        } else {
          this.setState({
            news: [],
            initLoading: false,
            cart: [],
            counter: 1
          });
        }
      })
      .catch(err => {
        this.setState({
          news: [],
          initLoading: false,
          cart: [],
          counter: 1
        });
      });

    // OLD SCHOOL MOBILE FIXED SCROLLABLE BACKGROUND
    const old_school = document.getElementsByClassName('container-row welcome-blog')
    const position = $(".container-row.welcome-blog").position();
    // const old_school_container = document.getElementById('old-school-list');
    // const carousel = $(".container.carousel-container");
    // console.log(link_height)
    // let 
    const link_height = $("#old-school-list a").height();
    $.when(old_school[0]).then(function () {
      // let old_school = this.state.news;
      old_school[0].style.background = `url(${bricks})`;
      old_school[0].style.backgroundRepeat = "repeat";
      old_school[0].style.backgroundSize = "container";


      // let old_school_list_height = link_height * old_school.length;
      // console.log(this.state.news.length)
      // console.log(old_school_list_height)
      if (old_school[0] && old_school[0].clientWidth < 500) {
        $(window).scroll(function () {
          // if (this.state.news && this.state.news.length > 0) {
          if (($(window).scrollTop() > 50) && (($(window).scrollTop() < old_school[0].clientHeight - 500))) {
            $('.oldschool-bg').css({ "position": "fixed", "top": "0" });
          } else if (($(window).scrollTop() > old_school[0].clientHeight + 100)) {
            $('.oldschool-bg').css({ "position": "absolute", "top": "" });

          }
          else {
            $('.oldschool-bg').css({ "position": "absolute", "top": "" });
          }
          // } 

        });
      }
    }).catch(function (err) {
      console.log(err)
      this.props.history.push(`/${this.props.location.pathname}`)
    })
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
    $(window).on("scroll", _.throttle(this.fetchMore, 2000))


  }

  fetchMore(e) {
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
        div.className = "body";


        let list = document.getElementsByClassName('category-news');

        if (list[0] && link) {

          if (currentNews && currentNews.length > 0 && (currentNews.length - 1 > this.state.counter)) {
            link.href = `/old-school/${currentNews[this.state.counter].subcat_slug}/${currentNews[this.state.counter].id}`;
            // link.href = `/old-school/${currentNews[this.state.counter].id}`;
            h2.innerText = currentNews[this.state.counter].title;
            img.src = currentNews[this.state.counter].newsMainImg;
            div.innerText = currentNews[this.state.counter].body.slice(0, 250).concat('...');
            link.appendChild(img)
            link.appendChild(h2)
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
      e.preventDefault()
      e.stopPropagation();

    } else {
      e.preventDefault()
      e.stopPropagation();


    }
  }



  // }
  // })
  render() {


    console.log(this.state.cart)
    let maxLenBody = 250;
    return (
      <div className="container-row welcome-blog">
        <img src={bricks} alt="shiny photoshopped stadium" className="oldschool-bg" />

        {this.state.initLoading ? (
          <div className="container">
            <div className="col-md-8">
              <img className="loading" alt="Loading gif" src={imgLoading} />
            </div>
          </div>
        ) : (
            // <Throttle handler="onScroll">
            <div onScroll={this.fetchMore} className="container-row">
              <div className="blog-list container">
                <h1 className="category-header">Old School <FaRegNewspaper /> </h1>
                <div id="old-school-list" className="col-sm-8">
                  {this.state.news.length > 0 ? (
                    <div className="list-wrapper">
                      <div className="category-news">

                        {/* <Link to={`/old-school/${this.state.news[0].id}`}> */}
                        <Link to={`/old-school/${this.state.news[1].subcat_slug}/${this.state.news[0].id}`}>
                          <img
                            src={this.state.news[0].newsMainImg}
                            alt=""
                          />
                          <h2>{this.state.news[0].title}</h2>
                          <div className="body">{this.state.news[0].body.slice(0, maxLenBody).concat('...')}</div>
                        </Link>
                        {/* <Link to={`/old-school/${this.state.news[1].id}`}> */}

                        <Link to={`/old-school/${this.state.news[1].subcat_slug}/${this.state.news[1].id}`}>
                          <img
                            src={this.state.news[1].newsMainImg}
                            alt=""
                          />
                          <h2>{this.state.news[1].title}</h2>
                          <div className="body">{this.state.news[1].body.slice(0, maxLenBody).concat('...')}</div>
                        </Link>
                        {!this.state.moreLoading ? (
                          <div className="container blog-list">
                            <div className="more-blog">
                              <img className="loading more-loading" alt="Loading gif" src={imgLoading} />
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












