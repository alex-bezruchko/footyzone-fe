import { LOADING, SUCCESS, FAILURE,  ADDING, ADDED, DELETING, DELETED, EDITING, EDITED, EDITFORM, FETCH_ALL_SUCCESS, SEARCH_RESULT, SET_SEARCH_TERM, CATEGORY_SUCCESS, CATEGORY_LOADING, CATEGORY_FAILURE } from '../actions/postsActions';

const initialState = {
    posts: [],
    loading: true,
    error: '',
    adding: false,
    added: false,
    editing: false,
    edited: false,
    deleting: false,
    editForm: false,
    addForm: true,
    editId: null,
    post: {},
    term: ''
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type){

        case CATEGORY_FAILURE: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: 'Categories not available',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: {},
        }
        
        case CATEGORY_LOADING: 
            return {
                ...state,
                posts: [],
                loading: true,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: {},
        }
        
        case CATEGORY_SUCCESS: 
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: {},
        }
        case SEARCH_RESULT: 
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: {},
            }
        case SET_SEARCH_TERM: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: {},
                term: action.payload
            }
        case FETCH_ALL_SUCCESS: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: action.payload
            }
        case EDITFORM: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                post: action.payload
            }
            
        case EDITING: 

            return {
                ...state,
                posts: [],
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: true,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: true,
                addForm: false,
                editId: null
            }

        case EDITED: 

            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: true,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                post: action.payload
            }
            
        case DELETING: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: true,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }

        case DELETED: 
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                deleted: true,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }

        case ADDING: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: '',
                adding: true,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }

        case ADDED: 
            
            return  {
                ...state,
                posts: action.payload,
                loading: false,
                error: '',
                adding: false,
                added: true,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }

        case LOADING:
            return {
                ...state,
                posts: [],
                loading: true,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }
        
        case SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null,
                post: {}
            }

        case FAILURE: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: 'We had a trouble finding this',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }

        default: 
            return state;
    }
}

export default postsReducer;