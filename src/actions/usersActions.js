import axios from "axios";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_STATUS_CHECKING = "LOGIN_STATUS_CHECKING";
export const LOGIN_STATUS_SUCCESS = "LOGIN_STATUS_SUCCESS";
export const LOGIN_STATUS_FAILURE = "LOGIN_STATUS_FAILURE";
export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const UPDATE_LOADING = "UPDATE_LOADING";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILURE = "UPDATE_FAILURE";

export function update(username) {
  return dispatch => {
    dispatch({ type: UPDATE_LOADING });

    const endpoint = `https://footyzone-be.herokuapp.com/api/users/${username.username}`;
    let updatedUser = {
      username: username.username,
      avatar: username.avatar,
    };
    axios
      .put(endpoint, updatedUser)
      .then(response => {
        dispatch({
          type: UPDATE_SUCCESS,
          payload: response.data.updatedUser,
        });
        localStorage.setItem("avatar", response.data.updatedUser.avatar);

      })
      .catch(err => {
        dispatch({
          type: UPDATE_FAILURE,
          payload: err,
        });
      });
  };
}

export function signup(username, password, history) {
  return dispatch => {
    dispatch({ type: SIGNUP_LOADING });

    const endpoint = "https://footyzone-be.herokuapp.com/auth/register";
    const newUser = {
      username: username,
      password: password,
      role_id: 1,
    };
    axios
      .post(endpoint, newUser)
      .then(response => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data,
        });
        history.push("/login");
        let registerBox = document.getElementsByClassName('register-box')
        if (registerBox[0]) {
          registerBox[0].style.display = "none"
        }
      })
      .catch(err => {
        dispatch({
          type: SIGNUP_FAILURE,
          payload: err,
        });
        history.push("/signup");
      });
  };
}

export function login(username, password, history) {
  return dispatch => {
    dispatch({ type: LOGIN_LOADING });

    const endpoint = "https://footyzone-be.herokuapp.com/auth/login";
    const UserLogin = {
      username: username,
      password: password,
    };
    axios
      .post(endpoint, UserLogin)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("avatar", response.data.avatar);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
        history.push("/");
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err,
        });
      });
  };
}

export function loginStatus(username, token, user_id, avatar, history) {
  return dispatch => {
    dispatch({ type: LOGIN_STATUS_CHECKING });
    const user = {
      username: username,
      token: token,
      user_id: user_id,
      avatar: avatar
    };

    if (user && token && user_id) {
      dispatch({
        type: LOGIN_STATUS_SUCCESS,
        payload: user,
      });
      // history.push('/')
    } else {
      dispatch({
        type: LOGIN_STATUS_FAILURE,
        payload: {},
      });
      // if (history.location.pathname === "/signup") {
      //   history.push("/signup");
      // } else {
      history.push("/signup");
      // }
    }
  };
}
