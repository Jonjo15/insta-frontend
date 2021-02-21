import {  useContext,useEffect, useReducer, createContext} from "react"
import feedReducer from "./FeedReducer"
import { SET_ERRORS, CLEAR_ERRORS, UPDATE_FEED} from "./types"
import axios from "axios"
const FeedContext = createContext();

export function useFeed() {
    return useContext(FeedContext)
}

export const initialState = {
    selectedUserPosts: [], 
    selectedUserInfo: null,
    feedPosts: [],
    error: null
};

export function FeedProvider({children}) {
    const [state, dispatch] = useReducer(feedReducer, initialState)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    useEffect(() => {
        // TODO: FINISH
        axios.get("http://localhost:5000/").then(res => {
            console.log(res.data)
            dispatch({type: UPDATE_FEED, payload: res.data.timeline})
        }).catch(err => {
            console.error(err)
            dispatch({type: SET_ERRORS, payload:{error: "Something went wrong"}})
        })
    }, [])
  
    const value = {
      state
    }
      return (
          <FeedContext.Provider value={value}>
              {children}
          </FeedContext.Provider>
      )
  }