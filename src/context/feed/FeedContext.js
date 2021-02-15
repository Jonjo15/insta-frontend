import { useEffect, useContext, useReducer, createContext} from "react"
import feedReducer from "./FeedReducer"
// import { LOADING_USER, LOG_OUT, SET_ERRORS, SET_USER, UPDATE_USER} from "./types"
import axios from "axios"
const FeedContext = createContext();

export function useFeed() {
    return useContext(FeedContext)
}

export const initialState = {
    selectedUserPosts: [], 
    feedPosts: [],
    error: null
};

export function FeedProvider({children}) {
    const [state, dispatch] = useReducer(feedReducer, initialState)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    useEffect(() => {
        //TODO: FINISH
        axios.get("http://localhotst:5000/").then(res => {
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
          <FeedContext.Provider value={value}>
              {children}
          </FeedContext.Provider>
      )
  }