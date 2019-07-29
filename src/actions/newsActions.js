import axios from "axios";

export const FETCH_ALL_SUCCESS = "FETCH_ALL_SUCCESS";
export const FETCH_ALL_FAILURE = "FETCH_ALL_FAILURE";
export const FETCH_ALL_LOADING = "FETCH_ALL_LOADING";
export const FETCH_POPULAR_SUCCESS = "FETCH_POPULAR_SUCCESS";
export const FETCH_POPULAR_FAILURE = "FETCH_POPULAR_FAILURE";
export const FETCH_POPULAR_LOADING = "FETCH_POPULAR_LOADING";
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

export function fetchPopular() {
  return dispatch => {
    dispatch({ type: FETCH_POPULAR_LOADING });
    axios
      .get("https://footyzone-be.herokuapp.com/api/news")
      .then(response => {
        let currentPopular = response.data.slice(0, 20);
        let bobo = currentPopular.sort(
          (a, b) => b.likes.length - a.likes.length
        );
        let mostest = bobo.slice(0, 5);
        dispatch({
          type: FETCH_POPULAR_SUCCESS,
          payload: mostest,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_POPULAR_FAILURE,
          payload: err,
        });
      });
  };
}

export function fetchAllNews() {
  return dispatch => {
    dispatch({ type: FETCH_ALL_LOADING });
    axios
      .get("https://footyzone-be.herokuapp.com/api/news")
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

export function fetchNewsBySubCategory(subcat_name) {
  return dispatch => {
    dispatch({ type: SUBCATEGORY_LOADING });
    axios
      .get(`https://footyzone-be.herokuapp.com/api/news/${subcat_name}`)
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

export function fetchUsersNews(id) {
  return dispatch => {
    dispatch({ type: USERS_POSTS_LOADING });
    axios
      .get(`https://footyzone-be.herokuapp.com/api/users/${id}/news`)
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

export function viewNews(category_name, subcat_name, id) {
  return dispatch => {
    dispatch({ type: FETCH_ONE_LOADING });
    axios
      .get(
        `https://footyzone-be.herokuapp.com/api/${category_name}/${subcat_name}/${id}`
      )
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

export function addNews(newNews, history) {
  // console.log(history);
  const token = localStorage.getItem("jwt");
  var config = {
    headers: { Authorization: token },
  };
  return dispatch => {
    dispatch({ type: ADDING_LOADING });
    axios
      .post(`https://footyzone-be.herokuapp.com/api/news`, newNews, config)
      .then(response => {
        dispatch({
          type: ADDED_SUCCESS,
          payload: response.data,
        });
        history.push(`/news/${response.data.addedNews.id}`);
      })
      .catch(err => {
        dispatch({
          type: ADDED_FAILURE,
          payload: err,
        });
      });
  };
}

export function editNews(id, news) {
  return dispatch => {
    dispatch({ type: EDITING_LOADING });
    axios
      .put(`https://footyzone-be.herokuapp.com/api/news/${id}`, news)
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

export function deleteNews(id) {
  return dispatch => {
    dispatch({ type: DELETING_LOADING });
    axios
      .delete(`https://footyzone-be.herokuapp.com/api/news/${id}`)
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
