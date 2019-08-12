import {
  FETCH_ALL_LOADING,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_FAILURE,
  FETCH_POPULAR_LOADING,
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_FAILURE,
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
  SEARCH_LOADING,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_SEARCH_TERM,
} from "../actions/newsActions";

const initialState = {
  news: [],
  popular: [],
  categories: [],
  subcategories: [],
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
  singleNews: {},
  term: "",
};

export const newsReducer = (state = initialState, action) => {
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
        news: [],
        loading: true,
        error: "",
      };

    case USERS_POSTS_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: "",
      };

    case USERS_POSTS_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        error: "There are no available posts",
      };

    case FETCH_ALL_LOADING:
      return {
        ...state,
        news: [],
        loading: true,
        error: "",
      };

    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_ALL_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        error: "There are no available posts",
      };

    case FETCH_POPULAR_LOADING:
      return {
        ...state,
        popular: [],
        loading: true,
        error: "",
      };

    case FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        popular: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_POPULAR_FAILURE:
      return {
        ...state,
        popular: [],
        loading: false,
        error: "There are no available posts",
      };

    case FETCH_ONE_LOADING:
      return {
        ...state,
        loading: true,
        singleNews: {},
        error: "",
      };

    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        singleNews: action.payload,
        error: "",
      };

    case FETCH_ONE_FAILURE:
      return {
        ...state,
        loading: false,
        singleNews: {},
        error: "We had a trouble finding this post",
      };

    case ADDING_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        adding: true,
        added: false,
        singleNews: {},
      };

    case ADDED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        adding: false,
        added: true,
        singleNews: action.payload,
      };

    case ADDED_FAILURE:
      return {
        ...state,
        loading: false,
        error: "All information is required.",
        adding: false,
        added: false,
        singleNews: {},
      };

    case CATEGORY_LOADING:
      return {
        ...state,
        news: [],
        loading: true,
        error: "",
      };

    case CATEGORY_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: "",
      };

    case CATEGORY_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        error: "Categories not available",
      };

    case SUBCATEGORY_LOADING:
      return {
        ...state,
        news: [],
        loading: true,
        error: "",
      };

    case SUBCATEGORY_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: "",
      };

    case SUBCATEGORY_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        error: "Categories not available",
      };

    case DELETING_LOADING:
      return {
        ...state,
        news: [],
        loading: true,
        deleting: true,
        deleted: false,
        error: "",
      };

    case DELETED_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        deleting: false,
        deleted: true,
        error: "",
      };

    case DELETED_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        deleting: false,
        deleted: false,
        error: "We couldn't delete this post",
      };

    case SEARCH_LOADING:
      return {
        ...state,
        news: [],
        loading: true,
        error: "",
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: "",
      };

    case SEARCH_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        error: "Nothing found",
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
        singleNews: {},
      };

    case EDITED_SUCCESS:
      return {
        ...state,
        news: [],
        loading: false,
        editing: false,
        edited: true,
        editForm: true,
        error: "",
        singleNews: action.payload,
      };

    case EDITED_FAILURE:
      return {
        ...state,
        news: [],
        loading: false,
        editing: false,
        edited: true,
        error: "We couldn't edit this post.",
        singleNews: {},
      };

    default:
      return state;
  }
};

export default newsReducer;
