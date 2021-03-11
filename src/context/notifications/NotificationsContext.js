import { useEffect, useContext, useReducer, createContext} from "react"
import notificationsReducer from "./NotificationsReducer"
import {SET_NOTIFICATIONS, MARK_ALL_READ, SET_ERROR} from "./types"
// import { LOADING_USER, LOG_OUT, SET_ERRORS, SET_USER, UPDATE_USER} from "./types"
import axios from "axios"
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
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/notifications/").then(res => {
            dispatch({type: SET_NOTIFICATIONS, payload: res.data})
        }).catch(err => {
            console.error(err)
            dispatch({type: SET_ERROR})
        })
    }, [])
    
    const markNotificationsRead = async (data) => {
        try {
            axios.put("http://localhost:5000/notifications/", data)
            dispatch({type: MARK_ALL_READ})
        }catch(err) {
            dispatch({type: SET_ERROR})
        }
        
    }
  
    const value = {
      state,
      markNotificationsRead
    }
      return (
          <NotificationsContext.Provider value={value}>
              {children}
          </NotificationsContext.Provider>
      )
  }