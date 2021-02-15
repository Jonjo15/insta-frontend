import { useEffect, useContext, useReducer, createContext} from "react"
import notificationsReducer from "./NotificationsReducer"
// import { LOADING_USER, LOG_OUT, SET_ERRORS, SET_USER, UPDATE_USER} from "./types"
import axios from "axios"
const NotificationsContext = createContext();

export function useFeed() {
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
        //TODO: FINISH
        axios.get("http://localhost:5000/notifications").then(res => {
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        })
    }, [])

    // const updateUser = (data) => {
    //     dispatch({type: UPDATE_USER, payload: data})
    // }
  
    const value = {
      state
    }
      return (
          <NotificationsContext.Provider value={value}>
              {children}
          </NotificationsContext.Provider>
      )
  }