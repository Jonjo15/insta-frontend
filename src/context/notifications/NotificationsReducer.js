import { MARK_NOTIFICATIONS_READ, UPDATE_USER, SET_NOTIFICATIONS } from "./types";

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
        case SET_NOTIFICATIONS:
          console.log(action.payload)
            return {
              ...state,
              notifications: action.payload.notifications
            }
      default:
        return state;
    }
  }