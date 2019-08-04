import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_STATUS_CHECKING,
  LOGIN_STATUS_SUCCESS,
  LOGIN_STATUS_FAILURE,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions/usersActions";

const initialState = {
  user: {
    token: "",
    username: "",
    user_id: "",
    avatar: "",
  },
  loginLoading: false,
  isLoggedIn: false,
  loginError: false,
  signupError: false,
  signupSuccess: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        loginLoading: true,
        user: {
          token: "",
          username: "",
          user_id: "",
          avatar: "",
        },
        loginError: false,
        signupError: false,
        signupSuccess: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: action.payload,
        loginError: false,
        signupError: false,
        signupSuccess: true,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        loginLoading: false,
        user: {
          token: "",
          username: "",
          user_id: "",
          avatar: "",
        },
        loginError: false,
        signupError: true,
        signupSuccess: false,
      };

    case LOGIN_STATUS_CHECKING:
      return {
        ...state,
        loginLoading: true,
        user: {
          token: "",
          username: "",
          user_id: "",
          avatar: "",
        },
        isLoggedIn: false,
        signupError: false,
        signupSuccess: false,
        loginError: false,
      };

    case LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: action.payload,
        isLoggedIn: true,
        signupError: false,
        signupSuccess: false,
        loginError: false,
      };

    case LOGIN_STATUS_FAILURE:
      return {
        ...state,
        loginLoading: false,
        user: {
          token: "",
          username: "",
          user_id: "",
          avatar: "",
        },
        isLoggedIn: false,
        signupError: false,
        signupSuccess: false,
        loginError: false,
      };

    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
        user: {
          token: "",
          username: "",
          user_id: "",
          avatar: "",
        },
        isLoggedIn: false,
        signupError: false,
        loginError: false,
        signupSuccess: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: action.payload,
        isLoggedIn: true,
        loginError: false,
        signupError: false,
        signupSuccess: false,
        loginError: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        user: {
          token: "",
          username: "",
          user_id: "",
          avatar: "",
        },
        isLoggedIn: false,
        loginError: true,
        signupError: false,
        signupSuccess: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
