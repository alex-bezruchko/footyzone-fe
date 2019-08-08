import React, {
  useState,
  useEffect
} from "react";
import NewsCatPagination from "./NewsCatPagination";
import axios from "axios";
import NewsCatList from "./NewsCatList";
import $ from "jquery";
// import { fetchNewsBySubCategory } from "../../actions/newsActions";
// import { Link } from "react-router-dom";

const NewsCategories = props => {
  window.scrollTo(0, 0);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      if (props.match.params.subcat_name === "page") {
        props.history.push(`/news/page/1`);
        setLoading(false);
      } else {
        const res = await axios.get(
          `https://footyzone-be.herokuapp.com/api/news/${
          props.match.params.subcat_name
          }`
        );
        setNews(res.data);
        if (
          props.match.params.page_id === 1 ||
          props.match.params.page_id === undefined
        ) {
          props.history.push(`/leagues/${props.match.params.subcat_name}/page/1`);
          setCurrentPage(1);
          setLoading(false);
        } else {
          props.history.push(
            `/leagues/${props.match.params.subcat_name}/page/${
            props.match.params.page_id
            }`
          );
          setCurrentPage(props.match.params.page_id);
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [props.match.params.subcat_name]);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  let client = document.getElementsByTagName("section");
  if (client[0] && client[0].clientWidth > 992) {
    let element = document.getElementsByClassName("twitter");
    $.when(element).then(function () {
      let width = element[0].clientWidth;
      $(".twitter").css("width", width);
      $(".twitter .twitter-fixed").css("width", width);
    });
  } else {
    $(".twitter").css("min-width", "100%");
    $(".twitter .twitter-fixed").css("min-width", "100%");
  }

  $(window).scroll(function (e) {
    if ($(window).scrollTop() > 800) {
      $(".single-main aside").addClass("aside-fixed");
      $(".single-body").addClass("body-fixed");
    } else {
      $(".single-main aside").removeClass("aside-fixed");
      $(".single-body").removeClass("body-fixed");
    }
  });
  $(window).scroll(function (e) {
    let article = document.getElementsByClassName("category-news");

    if (article[0]) {
      let height = article[0].clientHeight;
      if (
        $(window).scrollTop() > 150 &&
        $(window).scrollTop() < (height * 8.5) / 10
      ) {
        $(".col-md-4 .twitter").addClass("twitter-fixed");
      } else {
        $(".col-md-4 .twitter").removeClass("twitter-fixed");
        $(".single-main aside").removeClass("aside-fixed");

        $(".single-body").removeClass("body-fixed");
      }
    }
  });
  return (<
    div className="container-row news" >
    <
    div className="container-row" >
      <
        NewsCatList news={
          currentNews
        }
        loading={
          loading
        }
        subcat_name={
          props.match.params.subcat_name
        }
        className="container"
        props={
          props
        }
      /> <
    div className="container pagination" >
        <
          NewsCatPagination newsPerPage={
            newsPerPage
          }
          totalNews={
            news.length
          }
          paginate={
            paginate
          }
          subcat_name={
            props.match.params.subcat_name
          }
          currentPage={
            currentPage
          }
          props={
            props
          }
        /> <
    /div> <
    /div> <
    /div>
          );
        };
        
export default NewsCategories;