import { SET_SELECTED_USER, UPDATE_FEED,CLEAR_ERRORS, SET_ERRORS, UPDATE_USER } from "./types";

export default function feedReducer (state, action){
    switch(action.type) {
        case UPDATE_FEED: 
            return {
              ...state,
              feedPosts: action.payload
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