import axios from "axios";

export const FETCH_ALL_SUCCESS = "FETCH_ALL_SUCCESS";
export const FETCH_ALL_FAILURE = "FETCH_ALL_FAILURE";
export const FETCH_ALL_LOADING = "FETCH_ALL_LOADING";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const ADD_COMMENT_LOADING = "ADD_COMMENT_LOADING";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";
export const DELETE_COMMENT_LOADING = "DELETE_COMMENT_LOADING";
export const FETCH_WELCOME_SUCCESS = "FETCH_WELCOME_SUCCESS";
export const FETCH_WELCOME_FAILURE = "FETCH_WELCOME_FAILURE";
export const FETCH_WELCOME_LOADING = "FETCH_WELCOME_LOADING";
export const FETCH_ONE_SUCCESS = "FETCH_ONE_SUCCESS";
export const FETCH_ONE_FAILURE = "FETCH_ONE_FAILURE";
export const FETCH_ONE_LOADING = "FETCH_ONE_LOADING";
export const ADDING_LOADING = "ADDING_LOADING";
export const ADDED_SUCCESS = "ADDED_SUCCESS";
export const ADDED_FAILURE = "ADDED_FAILURE";
export const EDITING_LOADING = "EDITING_LOADING";
export const EDITED_SUCCESS = "EDITED_SUCCESS";
export const EDITED_FAILURE = "EDITED_FAILURE";
export const DELETING_LOADING = "DELETING_LOADING";
export const DELETED_SUCCESS = "DELETED_SUCCESS";
export const DELETED_FAILURE = "DELETED_FAILURE";
export const EDITFORM = "EDITFORM";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const FETCH_ALL_CATEGORIES_LOADING = "FETCH_ALL_CATEGORIES_LOADING";
export const FETCH_ALL_CATEGORIES_SUCCESS = "FETCH_ALL_CATEGORIES_SUCCESS";
export const FETCH_ALL_CATEGORIES_FAILURE = "FETCH_ALL_CATEGORIES_FAILURE";
export const FETCH_ALL_SUBCATEGORIES_LOADING =
  "FETCH_ALL_SUBCATEGORIES_LOADING";
export const FETCH_ALL_SUBCATEGORIES_SUCCESS =
  "FETCH_ALL_SUBCATEGORIES_SUCCESS";
export const FETCH_ALL_SUBCATEGORIES_FAILURE =
  "FETCH_ALL_SUBCATEGORIES_FAILURE";
export const CATEGORY_LOADING = "CATEGORY_LOADING";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILURE = "CATEGORY_FAILURE";
export const SUBCATEGORY_LOADING = "SUBCATEGORY_LOADING";
export const SUBCATEGORY_SUCCESS = "SUBCATEGORY_SUCCESS";
export const SUBCATEGORY_FAILURE = "SUBCATEGORY_FAILURE";
export const USERS_POSTS_LOADING = "USERS_POSTS_LOADING";
export const USERS_POSTS_SUCCESS = "USERS_POSTS_SUCCESS";
export const USERS_POSTS_FAILURE = "USERS_POSTS_FAILURE";

export function searchTerm(term) {
  return dispatch => {
    dispatch({ type: FETCH_ALL_LOADING });
    axios
      .get("https://footyzone-be.herokuapp.com/api/posts")
      .then(response => {
        const lowercasedTerm = term.toLowerCase();
        const searchPosts = response.data.filter(post => {
          const lowercasedTitle = post.title.toLowerCase();
          const lowercasedBody = post.body ? post.body.toLowerCase() : "";

          if (
            lowercasedTitle.includes(lowercasedTerm) ||
            lowercasedBody.includes(lowercasedTerm)
          ) {
            return true;
          } else {
            return false;
          }
        });

        dispatch({
          type: SEARCH_SUCCESS,
          payload: searchPosts,
        });
      })
      .catch(err => {
        dispatch({
          type: SEARCH_FAILURE,
          payload: err,
        });
      });
  };
}

export function deleteComment(id, post_id) {
  console.log(id)
  return dispatch => {
    dispatch({ type: DELETE_COMMENT_LOADING });
    
    axios
      .delete(`https://footyzone-be.herokuapp.com/api/blog/${post_id}/comments/${id}`)
      .then(response => {
        console.log(response.data)
        // const newNotes = this.state.notes.filter(note => note._id !== id);

        dispatch({
          type: DELETE_COMMENT_SUCCESS,
          payload: response.data.deleted,
        });
        // history.push(`/blog/${response.data.id}`);
      })
      .catch(err => {
        dispatch({
          type: DELETE_COMMENT_FAILURE,
          payload: err,
        });
      });
  };
  
}

export function addComment(comment, history) {
  console.log(comment)
  const token = localStorage.getItem("jwt");
    var config = {
    headers: { Authorization: token },
    };
  return dispatch => {
    dispatch({ type: ADD_COMMENT_LOADING });
    
    axios
      .post("https://footyzone-be.herokuapp.com/api/blog/comments", comment)
      .then(response => {
        console.log(response.data)
        dispatch({
          type: ADD_COMMENT_SUCCESS,
          payload: response.data,
        });
        // history.push(`/blog/${response.data.id}`);
      })
      .catch(err => {
        dispatch({
          type: ADD_COMMENT_FAILURE,
          payload: err,
        });
      });
  };
  
}
export function fetchAllPosts() {
  return dispatch => {
    dispatch({ type: FETCH_ALL_LOADING });
    axios
      .get("https://footyzone-be.herokuapp.com/api/blog")
      .then(response => {
        dispatch({
          type: FETCH_ALL_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ALL_FAILURE,
          payload: err,
        });
      });
  };
}
export function fetchLatestPosts() {
  return dispatch => {
    dispatch({ type: FETCH_WELCOME_LOADING });
    axios
      .get("https://footyzone-be.herokuapp.com/api/blog/welcome")
      .then(response => {
        dispatch({
          type: FETCH_WELCOME_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_WELCOME_FAILURE,
          payload: err,
        });
      });
  };
}

export function fetchPostsByCategory(category_name) {
  console.log(`https://footyzone-be.herokuapp.com/api/${category_name}`);
  return dispatch => {
    dispatch({ type: CATEGORY_LOADING });
    axios
      .get(`https://footyzone-be.herokuapp.com/api/${category_name}`)
      .then(response => {
        // console.log(response);
        dispatch({
          type: CATEGORY_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: CATEGORY_FAILURE,
          payload: err,
        });
      });
  };
}

export function fetchPostsBySubCategory(category_name, subcat_name) {
  console.log(
    `https://footyzone-be.herokuapp.com/api/${category_name}/${subcat_name}/`
  );

  return dispatch => {
    dispatch({ type: SUBCATEGORY_LOADING });
    axios
      .get(
        `https://footyzone-be.herokuapp.com/api/${category_name}/${subcat_name}`
      )
      .then(response => {
        dispatch({
          type: SUBCATEGORY_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: SUBCATEGORY_FAILURE,
          payload: err,
        });
      });
  };
}

export function fetchUsersPosts(id) {
  return dispatch => {
    dispatch({ type: USERS_POSTS_LOADING });
    axios
      .get(`https://footyzone-be.herokuapp.com/api/users/${id}/posts`)
      .then(response => {
        dispatch({
          type: USERS_POSTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: USERS_POSTS_FAILURE,
          payload: err,
        });
      });
  };
}

export function fetchAllCategories() {
  return dispatch => {
    dispatch({ type: FETCH_ALL_CATEGORIES_LOADING });
    axios
      .get("https://footyzone-be.herokuapp.com/api/news/categories")
      .then(response => {
        dispatch({
          type: FETCH_ALL_CATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ALL_CATEGORIES_FAILURE,
          payload: err,
        });
      });
  };
}

export function fetchAllSubCategories() {
  return dispatch => {
    dispatch({ type: FETCH_ALL_SUBCATEGORIES_LOADING });
    axios
      .get(`https://footyzone-be.herokuapp.com/api/news/subcategories`)
      .then(response => {
        dispatch({
          type: FETCH_ALL_SUBCATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ALL_SUBCATEGORIES_FAILURE,
          payload: err,
        });
      });
  };
}

export function viewPost(category_name, id) {
  return dispatch => {
    dispatch({ type: FETCH_ONE_LOADING });
    axios
      .get(`https://footyzone-be.herokuapp.com/api/${category_name}/${id}`)
      .then(response => {
        dispatch({
          type: FETCH_ONE_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ONE_FAILURE,
          payload: err,
        });
      });
  };
}

export function addPost(newPost, history) {
  // console.log(history);
  const token = localStorage.getItem("jwt");
  var config = {
    headers: { Authorization: token },
  };
  return dispatch => {
    dispatch({ type: ADDING_LOADING });
    axios
      .post(`https://footyzone-be.herokuapp.com/api/posts`, newPost, config)
      .then(response => {
        dispatch({
          type: ADDED_SUCCESS,
          payload: response.data,
        });
        history.push(`/post/${response.data.addedPost.id}`);
      })
      .catch(err => {
        dispatch({
          type: ADDED_FAILURE,
          payload: err,
        });
      });
  };
}

export function editPost(id, post) {
  return dispatch => {
    dispatch({ type: EDITING_LOADING });
    axios
      .put(`https://footyzone-be.herokuapp.com/api/posts/${id}`, post)
      .then(response => {
        dispatch({
          type: EDITED_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: EDITED_FAILURE,
          payload: err,
        });
      });
  };
}

export function deletePost(id) {
  return dispatch => {
    dispatch({ type: DELETING_LOADING });
    axios
      .delete(`https://footyzone-be.herokuapp.com/api/posts/${id}`)
      .then(response => {
        dispatch({
          type: DELETED_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: DELETED_FAILURE,
          payload: err,
        });
      });
  };
}

export function editForm(post) {
  return dispatch => {
    dispatch({ type: EDITFORM, payload: post });
  };
}

export function setSearchTerm(term) {
  return dispatch => {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: term,
    });
  };
}
