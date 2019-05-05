import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE , LOGIN_STATUS_CHECKING, LOGIN_STATUS_SUCCESS, LOGIN_STATUS_FAILURE} from '../actions/usersActions';

const initialState = {
    user: {
        token: '',
        username: ''
    },
    loginLoading: false,
    isLoggedIn: false,
    loginError: false,
    
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type){

        case LOGIN_STATUS_CHECKING:
            return {
                ...state,
                loginLoading: true,
                user: {
                    token: '',
                    username: ''
                },
                isLoggedIn: false,
            }

        case LOGIN_STATUS_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                user: action.payload,
                isLoggedIn: true,
            }
        
        case LOGIN_STATUS_FAILURE:
            return {
                ...state,
                loginLoading: false,
                user: {
                    token: '',
                    username: ''
                },
                isLoggedIn: false,
            }

        case LOGIN_LOADING: 
            return {
                ...state,
                loginLoading: true,
                user: {
                    token: '',
                    username: ''
                },
                isLoggedIn: false,
                loginError: false
            }

        case LOGIN_SUCCESS: 
            return {
                ...state,
                loginLoading: false,
                user: action.payload,
                isLoggedIn: true,
                loginError: false
            }

        case LOGIN_FAILURE: 
            return {
                ...state,
                loginLoading: false,
                user: {
                    token: '',
                    username: ''
                },
                isLoggedIn: false,
                loginError: true
            }

        default: 
            return state;
    }
}

export default usersReducer;