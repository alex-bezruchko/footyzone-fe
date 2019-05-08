import axios from 'axios';

export const SUCCESS = "SUCCESS";
export const FETCH_ALL_SUCCESS = "FETCH_ALL_SUCCESS";
export const FAILURE = "FAILURE";
export const LOADING = "LOADING";
export const ADDING = "ADDING";
export const ADDED = "ADDED";
export const EDITING = "EDITING";
export const EDITED = "EDITED";
export const DELETING = "DELETING";
export const DELETED = "DELETED";
export const EDITFORM = "EDITFORM";
export const SEARCH_RESULT = "SEARCH_RESULT";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const CATEGORY_LOADING = "CATEGORY_LOADING";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILURE = "CATEGORY_FAILURE";

export function searchTerm(term) {
    return dispatch => {
        dispatch({ type: LOADING })
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
                    type: SEARCH_RESULT,
                    payload: searchPosts
                });
            })
            .catch(err => {
                dispatch({
                    type: FAILURE,
                    payload: err
                })
            })
    }
}

export function fetchPosts() {
    return dispatch => {
        dispatch({ type: LOADING })
        axios
            .get('https://footyzone-be.herokuapp.com/api/posts')
            .then(response => {
                dispatch({
                    type: SUCCESS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: FAILURE,
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
        dispatch({ type: LOADING })
        axios
            .get(`https://footyzone-be.herokuapp.com/api/posts/${id}`)
            .then(response => {
                dispatch({
                    type: FETCH_ALL_SUCCESS,
                    payload: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: FAILURE,
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
        dispatch({ type: ADDING })
        axios
            .post(`https://footyzone-be.herokuapp.com/api/posts`, newPost)
            .then(response => {
                dispatch({
                    type: ADDED,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: FAILURE,
                    payload: err
                })
            })
    }
}

export function deletePost(id) {
    return dispatch => {
        dispatch({ type: DELETING })
        axios
            .delete(`https://footyzone-be.herokuapp.com/api/posts/${id}`)
            .then(response => {
                dispatch({
                    type: DELETED,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: FAILURE,
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

export function editPost(id, post) {
    return dispatch => {
        dispatch({ type: EDITING})
        axios
            .put(`https://footyzone-be.herokuapp.com/api/posts/${id}`, post)
            .then(response => {
                dispatch({
                    type: EDITED,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: FAILURE,
                    payload: err
                })
            })
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