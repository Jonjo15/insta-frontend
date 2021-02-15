import { MARK_NOTIFICATIONS_READ, UPDATE_USER } from "./types";

export default function notificationsReducer (state, action){
    switch(action.type) {
        case MARK_NOTIFICATIONS_READ: 
            return {
              ...state,
              //TODO:
            }  
        case UPDATE_USER: 
            return {
                ...state,
                //TODO:
            }
      default:
        return state;
    }
  }