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
    const blog = document.getElementsByClassName('container-row list')
    const position = $(".container-row.list").position();

    // let window_height = $(window).height();
    $.when(blog[0] && blog[0].length > 0 && position.top).then(function () {
      if (blog[0] && blog[0].clientWidth < 500) {
        $(window).scroll(function () {
          // console.log(`scroll + ${$(window).position()}`)
          if (($(window).scrollTop() > position.top) && ($(window).scrollTop() < $(blog[0]).outerHeight(true) * 8.7 / 10)) {
            $('.blog-bg').css({ "position": "fixed", "top": "0" });
          }
          else {
            $('.blog-bg').css({ "position": "absolute", "top": "" });
          }
        });
      }
    }).catch(function (err) {
      console.log(err)
      this.props.history.push(`/${this.props.location.pathname}`)
    })

  }, [props.match.params.page_id]);

  //

  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPosts, indexOfLastPosts);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // render() {
  return (
    <div className="container-row blog">
      <div className="container-row list">
        <img src={stadium} alt="shiny photoshopped stadium" className="blog-bg" />
        <div className="container">
          <Postslist posts={currentPosts} loading={loading} props={props} />
        </div>
      </div>
      <br></br>
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
