import {  useContext,useEffect, useReducer, createContext} from "react"
import feedReducer from "./FeedReducer"
import { SET_ERRORS, LIKE_UNLIKE_POST, UPDATE_FEED, SET_EXPLORE, SET_RECOMMENDED,ADD_EXPLORE, SEND_FOLLOW_REQUEST} from "./types"
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
    skip: 0,
    exploreEndFetch: false,
    recommended: [],
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
        axios.get("http://localhost:5000/explore/" + state.skip).then(res => {
            // console.log(res.data)
            dispatch({type: SET_EXPLORE, payload: res.data.users})

        }).catch(err => {
            // console.error(err)
            dispatch({type: SET_ERRORS, payload: {error: "Something went wrong"}})
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/recommended").then(res => {
            dispatch({type: SET_RECOMMENDED, payload: res.data.recommendedUsers})
        }).catch(err => {
            dispatch({type: SET_ERRORS, payload: {error: "Something went wrong"}})
        })
    }, [])
    const likeUnlike = async (id) => {
        try {
            const res = await axios.put("http://localhost:5000/posts/"+ id)
            // console.log(res.data)
            dispatch({type: LIKE_UNLIKE_POST, payload: res.data.updatedPost})

        } catch (err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed like/unlike action"}})
        }
    }
    const sendRequest = async (recipientId) => {
        try {
            const res = await axios.post("http://localhost:5000/users/"+ recipientId)
            console.log(res.data)
            dispatch({type: SEND_FOLLOW_REQUEST, payload: res.data.updatedRecipient})
        } catch (err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to send follow request"}})
        }
    }
    const exploreMore = async () =>{
        try {
            const res = await axios.get("http://localhost:5000/explore/" + state.skip)
            console.log(res.data)
            dispatch({type: ADD_EXPLORE, payload: res.data.users})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to load more"}})
        }
    }
    const value = {
      state,
      likeUnlike,
      sendRequest,
      exploreMore
    }
      return (
          <FeedContext.Provider value={value}>
              {children}
          </FeedContext.Provider>
      )
  }