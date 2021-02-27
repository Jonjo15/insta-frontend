import {  useContext,useEffect, useReducer, createContext} from "react"
import feedReducer from "./FeedReducer"
import { SET_ERRORS, LIKE_UNLIKE_POST, UPDATE_FEED, SET_EXPLORE} from "./types"
import axios from "axios"
const FeedContext = createContext();

export function useFeed() {
    return useContext(FeedContext)
}

export const initialState = {
    selectedUserPosts: [], 
    selectedUserInfo: null,
    feedPosts: [],
    explore: [],
    loading: true,
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
    
    useEffect(() => {
        axios.get("http://localhost:5000/explore/0").then(res => {
            console.log(res.data)
            dispatch({type: SET_EXPLORE, payload: res.data.users})

        }).catch(err => {
            console.error(err)
            dispatch({type: SET_ERRORS, payload: {error: "Something went wrong"}})
        })
    }, [])
    const likeUnlike = async (id) => {
        try {
            const res = await axios.put("http://localhost:5000/posts/"+ id)
            console.log(res.data)
            dispatch({type: LIKE_UNLIKE_POST, payload: res.data.updatedPost})

        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed like/unlike action"}})
        }
    }

    const value = {
      state,
      likeUnlike
    }
      return (
          <FeedContext.Provider value={value}>
              {children}
          </FeedContext.Provider>
      )
  }