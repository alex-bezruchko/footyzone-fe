import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_LOADING,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_LOADING,
  FETCH_ALL_LOADING,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_FAILURE,
  FETCH_WELCOME_LOADING,
  FETCH_WELCOME_SUCCESS,
  FETCH_WELCOME_FAILURE,
  FETCH_ONE_LOADING,
  FETCH_ONE_FAILURE,
  FETCH_ONE_SUCCESS,
  ADDING_LOADING,
  ADDED_SUCCESS,
  ADDED_FAILURE,
  CATEGORY_SUCCESS,
  CATEGORY_LOADING,
  CATEGORY_FAILURE,
  SUBCATEGORY_SUCCESS,
  SUBCATEGORY_LOADING,
  SUBCATEGORY_FAILURE,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_LOADING,
  FETCH_ALL_CATEGORIES_FAILURE,
  FETCH_ALL_SUBCATEGORIES_SUCCESS,
  FETCH_ALL_SUBCATEGORIES_LOADING,
  FETCH_ALL_SUBCATEGORIES_FAILURE,
  USERS_POSTS_LOADING,
  USERS_POSTS_SUCCESS,
  USERS_POSTS_FAILURE,
  DELETING_LOADING,
  DELETED_SUCCESS,
  DELETED_FAILURE,
  EDITING_LOADING,
  EDITED_SUCCESS,
  EDITED_FAILURE,
  EDITFORM,
  SEARCH_SUCCESS,
  SET_SEARCH_TERM,
} from "../actions/postsActions";

const initialState = {
  posts: [],
  comments: [],
  categories: [],
  subcategories: [],
  comment_loading: false,
  loading: true,
  error: "",
  adding: false,
  added: false,
  editing: false,
  edited: false,
  deleting: false,
  editForm: false,
  addForm: true,
  editId: null,
  post: {},
  term: "",
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SUBCATEGORIES_LOADING:
      return {
        ...state,
        subcategories: [],
        loading: true,
        error: "",
      };

    case FETCH_ALL_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_ALL_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        subcategories: [],
        loading: false,
        error: "There are no available categories",
      };

    case FETCH_ALL_CATEGORIES_LOADING:
      return {
        ...state,
        categories: [],
        loading: true,
        error: "",
      };

    case FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        loading: false,
        error: "There are no available categories",
      };

    case USERS_POSTS_LOADING:
      return {
        ...state,
        posts: [],
        loading: true,
        error: "",
      };

    case USERS_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };

    case USERS_POSTS_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        error: "There are no available posts",
      };

    case ADD_COMMENT_LOADING:
      return {
        ...state,
        comments: [],
        // comment_loading: true,
        error: "",
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments,
        // comment_loading: false,
        error: "",
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        comments: [],
        // comment_loading: false,
        error: "There are no available posts",
      };

     case DELETE_COMMENT_LOADING:
      return {
        ...state,
        comments: [],
        // comment_loading: true,
        error: "",
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        // comment_loading: false,
        error: "",
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        comments: [],
        // comment_loading: false,
        error: "There are no available posts",
      };

    case FETCH_ALL_LOADING:
      return {
        ...state,
        posts: [],
        loading: true,
        error: "",
      };

    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_ALL_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        error: "There are no available posts",
      };

    case FETCH_WELCOME_LOADING:
      return {
        ...state,
        posts: [],
        loading: true,
        error: "",
      };

    case FETCH_WELCOME_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_WELCOME_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        error: "There are no available posts",
      };

    case FETCH_ONE_LOADING:
      return {
        ...state,
        loading: true,
        post: {},
        comments: [],
        error: "",
      };

    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        comments: action.payload.comments,
        error: "",
      };

    case FETCH_ONE_FAILURE:
      return {
        ...state,
        loading: false,
        post: {},
        comments: [],
        error: "We had a trouble finding this post",
      };

    case ADDING_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        adding: true,
        added: false,
        post: {},
      };

    case ADDED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        adding: false,
        added: true,
        post: action.payload,
      };

    case ADDED_FAILURE:
      return {
        ...state,
        loading: false,
        error: "All information is required.",
        adding: false,
        added: false,
        post: {},
      };

    case CATEGORY_LOADING:
      return {
        ...state,
        posts: [],
        loading: true,
        error: "",
      };

    case CATEGORY_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };

    case CATEGORY_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        error: "Categories not available",
      };

    case SUBCATEGORY_LOADING:
      return {
        ...state,
        posts: [],
        loading: true,
        error: "",
      };

    case SUBCATEGORY_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };

    case SUBCATEGORY_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        error: "Categories not available",
      };

    case DELETING_LOADING:
      return {
        ...state,
        posts: [],
        loading: true,
        deleting: true,
        deleted: false,
        error: "",
      };

    case DELETED_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        deleting: false,
        deleted: true,
        error: "",
      };

    case DELETED_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        deleting: false,
        deleted: false,
        error: "We couldn't delete this post",
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.payload,
      };

    case EDITFORM:
      return {
        ...state,
        editForm: true,
      };

    case EDITING_LOADING:
      return {
        ...state,
        loading: false,
        editing: true,
        edited: false,
        editForm: true,
        error: "",
        post: {},
      };

    case EDITED_SUCCESS:
      return {
        ...state,
        posts: [],
        loading: false,
        editing: false,
        edited: true,
        editForm: true,
        error: "",
        post: action.payload,
      };

    case EDITED_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        editing: false,
        edited: true,
        error: "We couldn't edit this post.",
        post: {},
      };

    default:
      return state;
  }
};

export default postsReducer;
