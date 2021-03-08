import {  useContext, useEffect, useReducer, createContext} from "react"
import feedReducer from "./FeedReducer"
import { SET_ERRORS, LIKE_UNLIKE_POST,ADD_COMMENT,DELETE_POST, UPDATE_FEED,LIKE_UNLIKE_COMMENT, SET_EXPLORE, DELETE_COMMENT, SET_RECOMMENDED,ADD_EXPLORE, SEND_FOLLOW_REQUEST} from "./types"
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
    const addComment = async (post, currentUser, body) => {
        try {
            const res = await axios.post("http://localhost:5000/posts/"+ post._id, {body})
            dispatch({type: ADD_COMMENT, payload: {post, currentUser, updatedPost: res.data.updatedPost, comment: res.data.comment}})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Post the comment"}})
        }
    }
    const deleteComment = async (id, postId) => {
        try {
            await axios.delete("http://localhost:5000/comments/" + id)
            dispatch({type: DELETE_COMMENT, payload: {commentId: id, postId}})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to delete comment"}})
        }
    }
    const likeUnlikeComment = async (id, postId) => {
        try {
            const res = await axios.put("http://localhost:5000/comments/"+ id)
            console.log(res.data)
            dispatch({type: LIKE_UNLIKE_COMMENT, payload: {updatedComment: res.data.updatedComment, postId}})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to like/unlike comment"}})
        }
    }
    const deletePost = async (id) => {
        try {
            const res = await axios.delete("http://localhost:5000/posts/" + id)
            console.log(res.data)
            dispatch({type: DELETE_POST, payload: id})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to delete Post"}})  
        }
    }
    const setUserProfile = async (id, skip) => {
        try {
            const res = await axios.get("http://localhost:5000/users/"+ id + "/" + skip)
            console.log(res.data)
            // TODO: FINISH
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to delete Post"}})  
        }
    }
    const value = {
      state,
      likeUnlike,
      sendRequest,
      exploreMore,
      addComment,
      deleteComment,
      likeUnlikeComment,
      deletePost
    }
      return (
          <FeedContext.Provider value={value}>
              {children}
          </FeedContext.Provider>
      )
  }