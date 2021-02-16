import { MARK_NOTIFICATIONS_READ, UPDATE_USER, SET_NOTIFICATIONS, MARK_ALL_READ } from "./types";

export default function notificationsReducer (state, action){
    switch(action.type) {
        case MARK_NOTIFICATIONS_READ: 
            return {
              ...state,
              //TODO:
            }  
        case MARK_ALL_READ:
            let newNotify = state.notifications.map(n => {
              n.seen = true
              return n
            })
            return {
              ...state,
              notifications: newNotify  
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