import { useEffect, useContext, useReducer, createContext} from "react"
import notificationsReducer from "./NotificationsReducer"
import {SET_NOTIFICATIONS, MARK_ALL_READ, SET_ERROR, RESET_STATE} from "./types"
// import { LOADING_USER, LOG_OUT, SET_ERRORS, SET_USER, UPDATE_USER} from "./types"
import axios from "axios"
import { useAuth } from "../auth/AuthContext";
const NotificationsContext = createContext();

export function useNotifications() {
    return useContext(NotificationsContext)
}

export const initialState = {
    notifications: [],
    error: null
};

export function NotificationsProvider({children}) {
    const [state, dispatch] = useReducer(notificationsReducer, initialState)
    const {state: {authenticated}} = useAuth()
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    useEffect(() => {
        if (!authenticated) {
            return
        }
        axios.get("http://localhost:5000/notifications/").then(res => {
            dispatch({type: SET_NOTIFICATIONS, payload: res.data})
        }).catch(err => {
            console.error(err)
            dispatch({type: SET_ERROR})
        })
    }, [authenticated])
    
    const markNotificationsRead = async (data) => {
        try {
            axios.put("http://localhost:5000/notifications/", data)
            dispatch({type: MARK_ALL_READ})
        }catch(err) {
            dispatch({type: SET_ERROR})
        }
        
    }
    const resetNotificationState = () => {
        dispatch({type: RESET_STATE})
    }
    const value = {
      state,
      markNotificationsRead,
      resetNotificationState
    }
      return (
          <NotificationsContext.Provider value={value}>
              {children}
          </NotificationsContext.Provider>
      )
  }