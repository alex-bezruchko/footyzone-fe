import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Postslist from "./Postslist";

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

  // render() {
  return (
    <div className="container-row blog">
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
