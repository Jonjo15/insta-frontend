import {  SET_NOTIFICATIONS, MARK_ALL_READ, SET_ERROR } from "./types";

export default function notificationsReducer (state, action){
    switch(action.type) {
        
        case SET_ERROR: 
            return {
              ...state,
              error: "Failed to mark notifications read"
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