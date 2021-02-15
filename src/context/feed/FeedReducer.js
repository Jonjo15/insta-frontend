import { SET_SELECTED_USER, UPDATE_FEED, UPDATE_USER } from "./types";

export default function feedReducer (state, action){
    switch(action.type) {
        case UPDATE_FEED: 
            return {
              ...state,
              //TODO:
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
      default:
        return state;
    }
  }