import {SET_AUTHENTICATED, SET_UNAUTHENTICATED,ACCEPT_REQUEST,CLEAR_ERRORS, DECLINE_REQUEST, LOADING_USER, SET_USER, FINISH_LOADING, LOG_OUT, SET_ERRORS, UPDATE_USER} from "./types"
import {initialState} from "./AuthContext"
export default function authReducer (state, action){
    let accepted;
    let newFollowRequests;
    switch(action.type) {
        case SET_UNAUTHENTICATED:
            return {
            ...state,
            currentUser: null,
            error: null,
            authenticated: false
            }
        case ACCEPT_REQUEST: 
            accepted = state.currentUser.follow_requests.find(u => u._id === action.payload)
            newFollowRequests = state.currentUser.follow_requests.filter(u => u._id !== action.payload)
            return {
                ...state,
                error: null,
                currentUser: {...state.currentUser, follow_requests: newFollowRequests, followers: [...state.currentUser.followers, accepted ]}
            }
        case DECLINE_REQUEST:
            console.log(action.payload)
            newFollowRequests = state.currentUser.follow_requests.filter(u => u._id !== action.payload)
            return {
                ...state,
                error: null,
                currentUser: {...state.currentUser, follow_requests: newFollowRequests}
            }
        case SET_AUTHENTICATED:
            return {
              ...state,
              error: null,
              authenticated: true
            }
        case LOADING_USER:
            return {
                ...state,
                error: null,
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
                error: null,
                currentUser: action.payload.user,
                token: action.payload.token || state.token,
                authenticated: true
            }
        case UPDATE_USER: 
            return {
                ...state,
                error: null,
                currentUser: action.payload,
                loading: false
            }
        case LOG_OUT:
            localStorage.removeItem("token")
            return {
                ...initialState, 
                error: null,
                loading: false
            }
        case SET_ERRORS:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
      default:
        return state;
    }
  }