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
      setLoading(false);
    };

    fetchPosts();
  }, []);
  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPosts, indexOfLastPosts);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  console.log(posts[0]);
  // render() {
  return (
    <div className="container-row blog">
      <Postslist posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Bloglist;
