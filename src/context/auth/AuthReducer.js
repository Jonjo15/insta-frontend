import {SET_AUTHENTICATED, SET_UNAUTHENTICATED,ACCEPT_REQUEST, DECLINE_REQUEST, LOADING_USER, SET_USER, FINISH_LOADING, LOG_OUT, SET_ERRORS, UPDATE_USER} from "./types"
import {initialState} from "./AuthContext"
export default function authReducer (state, action){
    switch(action.type) {
        case SET_UNAUTHENTICATED:
            return {
            ...state,
            currentUser: null,
            authenticated: false
            }
        case ACCEPT_REQUEST: 
            //TODO:
            return {
                ...state,

            }
        case DECLINE_REQUEST:
            //TODO:
            return {
                ...state
            }
        case SET_AUTHENTICATED:
            return {
              ...state,
              authenticated: true
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case FINISH_LOADING:
            return {
                ...state,
                loading: false
            }
        case SET_USER:
            if (action.payload.token) localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user,
                token: action.payload.token || state.token,
                authenticated: true
            }
        case UPDATE_USER: 
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            }
        case LOG_OUT:
            localStorage.removeItem("token")
            return {
                ...initialState, 
                loading: false
            }
        case SET_ERRORS:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
      default:
        return state;
    }
  }