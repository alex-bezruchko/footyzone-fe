import { 
    FETCH_ALL_LOADING, FETCH_ALL_SUCCESS, FETCH_ALL_FAILURE, 
    FETCH_ONE_LOADING, FETCH_ONE_FAILURE,FETCH_ONE_SUCCESS, 
    ADDING_LOADING, ADDED_SUCCESS, ADDED_FAILURE, 
    CATEGORY_SUCCESS, CATEGORY_LOADING, CATEGORY_FAILURE,
    FETCH_ALL_CATEGORIES_SUCCESS, FETCH_ALL_CATEGORIES_LOADING, FETCH_ALL_CATEGORIES_FAILURE,
    DELETING_LOADING, DELETED_SUCCESS, DELETED_FAILURE,
    EDITING_LOADING, EDITED_SUCCESS, EDITED_FAILURE,
    EDITFORM, SEARCH_SUCCESS, SET_SEARCH_TERM,  
} from '../actions/postsActions';

const initialState = {
    posts: [],
    categories: [],
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

        case FETCH_ALL_CATEGORIES_LOADING:
            return {
                ...state,
                categories: [],
                loading: true,
                error: '',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: false,
                editId: null
            }
        
        case FETCH_ALL_CATEGORIES_SUCCESS: 
            return {
                ...state,
                categories: action.payload,
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
                post: {}
            }

        case FETCH_ALL_CATEGORIES_FAILURE: 
            return {
                ...state,
                categories: [],
                loading: false,
                error: 'There are no available posts',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: false,
                editId: null
            }
        
        case FETCH_ALL_LOADING:
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
                addForm: false,
                editId: null
            }
        
        case FETCH_ALL_SUCCESS: 
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
                post: {}
            }

        case FETCH_ALL_FAILURE: 
            return {
                ...state,
                posts: [],
                loading: false,
                error: 'There are no available posts',
                adding: false,
                added: false,
                editing: false,
                edited: false,
                deleting: false,
                currentPost: false,
                editForm: false,
                addForm: false,
                editId: null
            }

        case FETCH_ONE_LOADING:
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
                editId: null,
                post: {}
            }
        
        case FETCH_ONE_SUCCESS:
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
                editForm: false,
                addForm: true,
                editId: null,
                post: action.payload
            }

        case FETCH_ONE_FAILURE: 
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
                editId: null,
                post: {}
            }

        case ADDING_LOADING: 
            return {
                ...state,
                posts: [],
                loading: true,
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

        case ADDED_SUCCESS: 
            
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

        case ADDED_FAILURE: 
            
            return  {
                ...state,
                posts: [],
                loading: false,
                error: 'All information is required.',
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
        
        case DELETING_LOADING: 
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

        case DELETED_SUCCESS: 
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

        case DELETED_FAILURE: 
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
                deleted: false,
                currentPost: false,
                editForm: false,
                addForm: true,
                editId: null
            }

        case SEARCH_SUCCESS: 
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
            
        case EDITING_LOADING: 
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

        case EDITED_SUCCESS: 
            return {
                ...state,
                posts: [],
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
        
        case EDITED_FAILURE: 
            return {
                ...state,
                posts: [],
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
                post: {}
            }
         
        

        default: 
            return state;
    }
}

export default postsReducer;