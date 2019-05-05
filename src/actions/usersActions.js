import axios from 'axios';

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_STATUS_CHECKING = "LOGIN_STATUS_CHECKING";
export const LOGIN_STATUS_SUCCESS = "LOGIN_STATUS_SUCCESS";
export const LOGIN_STATUS_FAILURE = "LOGIN_STATUS_FAILURE";
export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export function signup(username, password, history) {
    return dispatch => {
        dispatch({ type: SIGNUP_LOADING })

        const endpoint = 'https://footyzone-be.herokuapp.com/auth/register';
        const newUser = {
            username: username,
            password: password,
            role_id: 1,
        }
        axios
            .post(endpoint, newUser)
            .then(response => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: response.data
                });
                history.push('/login')

            })
            .catch(err => {
                dispatch({
                    type: SIGNUP_FAILURE,
                    payload: err
                })
            })
    }
}

export function login(username, password, history) {
    return dispatch => {
        dispatch({ type: LOGIN_LOADING })

        const endpoint = 'https://footyzone-be.herokuapp.com/auth/login';
        const UserLogin = {
            username: username,
            password: password
        }
        axios
            .post(endpoint, UserLogin)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('username', response.data.username);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                });
                history.push('/')

            })
            .catch(err => {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: err
                })
            })
    }
}

export function loginStatus(username, token, history) {
    return dispatch => {
        dispatch({ type: LOGIN_STATUS_CHECKING })
        const user = {
            username: username,
            token: token
        }

        if (user && token) {
            dispatch({
                type: LOGIN_STATUS_SUCCESS,
                payload: user
            });
            // history.push('/')
        } else {
            dispatch({
                type: LOGIN_STATUS_FAILURE,
                payload: {}
            });
            if (history.location.pathname === '/signup') {
                history.push('/signup')
            }
            else {
                history.push('/login')
            }
        }
       
    }
}
