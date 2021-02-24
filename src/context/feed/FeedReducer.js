import { SET_SELECTED_USER, UPDATE_FEED,CLEAR_ERRORS, SET_ERRORS, UPDATE_USER, LIKE_UNLIKE_POST } from "./types";

export default function feedReducer (state, action){
    let feedCopy;
    let newFeed;
    switch(action.type) {
        case UPDATE_FEED: 
            return {
              ...state,
              feedPosts: action.payload,
              loading: false
            } 
        case LIKE_UNLIKE_POST: 
            feedCopy = state.feedPosts;
            newFeed = feedCopy.map(p => {
                if (p._id === action.payload._id) {
                    return {...action.payload, poster: p.poster}
                }
                else return p
            })
            return {
                ...state,
                feedPosts: newFeed,
                selectedUserPosts: state.selectedUserPosts.map(p => {
                    if(p._id === action.payload._id) {
                        return {...action.payload, poster: p.poster}
                    }
                    else {
                        return p
                    }
                })
            }
        case UPDATE_USER: 
            return {
                ...state,
                //TODO:
            }
        case SET_SELECTED_USER:
            return {
                ...state,
                //TODO:
            }
        case SET_ERRORS: 
            return {
                ...state,
                error: action.payload.error
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