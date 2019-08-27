import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Postslist from "./Postslist";
import $ from "jquery";
import stadium from "./../../img/small-blog.jpg";


const Bloglist = props => {
  window.scrollTo(0, 0);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://footyzone-be.herokuapp.com/api/blog/`
      );
      setPosts(res.data);
      if (
        props.match.params.page_id === 1 ||
        props.match.params.page_id === undefined
      ) {
        props.history.push(`/blog/page/1`);
        setCurrentPage(1);
        setLoading(false);
      } else {
        props.history.push(`/blog/page/${props.match.params.page_id}`);
        setCurrentPage(props.match.params.page_id);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [props.match.params.page_id]);

  //

  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPosts, indexOfLastPosts);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  let blog = document.getElementsByClassName('container-row blog')

  // let window_height = $(window).height();
  $.when(blog[0]).then(function () {
    let x = $(".container-row.blog").position();
    $.when(x).then(function () {
      if (blog[0].clientWidth < 500) {
        $(window).scroll(function () {
          // if (blo)
          if (($(window).scrollTop() > x.top) && ($(window).scrollTop() < blog[0].clientHeight * 8.5 / 10)) {
            this.console.log(blog[0].outerHeight)

            $('.blog-bg').css({ "position": "fixed", "top": "0" });
          }
          else {
            $('.blog-bg').css({ "position": "absolute", "top": "" });
          }
        });
      }

    })
  })
  // render() {
  return (
    <div className="container-row blog">
      <img src={stadium} alt="shiny photoshopped stadium" className="blog-bg" />

      <Postslist posts={currentPosts} loading={loading} props={props} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
        props={props}
      />
    </div>
  );
};

export default Bloglist;
