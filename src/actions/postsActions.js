import axios from 'axios';

export const FETCH_ALL_SUCCESS = "FETCH_ALL_SUCCESS";
export const FETCH_ALL_FAILURE = "FETCH_ALL_FAILURE";
export const FETCH_ALL_LOADING = "FETCH_ALL_LOADING";
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
export const CATEGORY_LOADING = "CATEGORY_LOADING";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILURE = "CATEGORY_FAILURE";

export function searchTerm(term) {
    return dispatch => {
        dispatch({ type: FETCH_ALL_LOADING })
        axios
            .get('https://footyzone-be.herokuapp.com/api/posts')
            .then(response => {

                const lowercasedTerm = term.toLowerCase();
                const searchPosts = response.data.filter(post => {

                    const lowercasedTitle = post.title.toLowerCase();
                    const lowercasedBody = post.body? post.body.toLowerCase():'';
                    
                    if (lowercasedTitle.includes(lowercasedTerm) || lowercasedBody.includes(lowercasedTerm)) {
                        return true;
                    } else {
                        return false
                    }
                });
                
                dispatch({
                    type: SEARCH_SUCCESS,
                    payload: searchPosts
                });
            })
            .catch(err => {
                dispatch({
                    type: SEARCH_FAILURE,
                    payload: err
                })
            })
    }
}

export function fetchPosts() {
    return dispatch => {
        dispatch({ type: FETCH_ALL_LOADING })
        axios
            .get('https://footyzone-be.herokuapp.com/api/posts')
            .then(response => {
                dispatch({
                    type: FETCH_ALL_SUCCESS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: FETCH_ALL_FAILURE,
                    payload: err
                })
            })
    }
}

export function fetchPostsByCategory(id) {
    return dispatch => {
        dispatch({ type: CATEGORY_LOADING })
        axios
            .get(`https://footyzone-be.herokuapp.com/api/posts/category/${id}`)
            .then(response => {
                dispatch({
                    type: CATEGORY_SUCCESS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: CATEGORY_FAILURE,
                    payload: err
                })
            })
    }
}

export function viewPost(id) {
    return dispatch => {
        dispatch({ type: FETCH_ONE_LOADING })
        axios
            .get(`https://footyzone-be.herokuapp.com/api/posts/${id}`)
            .then(response => {
                dispatch({
                    type: FETCH_ONE_SUCCESS,
                    payload: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: FETCH_ONE_FAILURE,
                    payload: err
                })
            })
    }
}

export function addPost(post) {

    const newPost = {
        title: post.title,
        body: post.body
    }
    return dispatch => {
        dispatch({ type: ADDING_LOADING })
        axios
            .post(`https://footyzone-be.herokuapp.com/api/posts`, newPost)
            .then(response => {
                dispatch({
                    type: ADDED_SUCCESS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: ADDED_FAILURE,
                    payload: err
                })
            })
    }
}

export function editPost(id, post) {
    return dispatch => {
        dispatch({ type: EDITING_LOADING})
        axios
            .put(`https://footyzone-be.herokuapp.com/api/posts/${id}`, post)
            .then(response => {
                dispatch({
                    type: EDITED_SUCCESS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: EDITED_FAILURE,
                    payload: err
                })
            })
    }
    
}

export function deletePost(id) {
    return dispatch => {
        dispatch({ type: DELETING_LOADING })
        axios
            .delete(`https://footyzone-be.herokuapp.com/api/posts/${id}`)
            .then(response => {
                dispatch({
                    type: DELETED_SUCCESS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: DELETED_FAILURE,
                    payload: err
                })
            })
    }
}

export function editForm(post) {
    return dispatch => {
        dispatch({ type: EDITFORM, payload: post })
    }
}


export function setSearchTerm(term) {
    return dispatch => {
        dispatch({
            type: SET_SEARCH_TERM,
            payload: term
        });
        
    }
}