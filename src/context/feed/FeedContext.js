import {  useContext, useEffect, useReducer, createContext} from "react"
import feedReducer from "./FeedReducer"
import { SET_ERRORS, 
    LIKE_UNLIKE_POST,
    ADD_COMMENT,
    UPDATE_BIO,
    DELETE_POST,
    RESET_USER_PROFILE,
    SET_SELECTED_USER, 
    ADD_POST,
    UPDATE_FEED,
    LIKE_UNLIKE_COMMENT, 
    SET_EXPLORE, 
    DELETE_COMMENT, 
    SET_RECOMMENDED,
    ADD_EXPLORE,
    SEND_FOLLOW_REQUEST,
    CANCEL_REQUEST,
    SET_SINGLE_POST,
    RESET_SINGLE_POST,
    UPDATE_PROFILE_PIC,
    UNFOLLOW,
    LOAD_MORE_PROFILE_POSTS,
    RESET_STATE
} from "./types"
import axios from "axios"
import { useAuth } from "../auth/AuthContext";
const FeedContext = createContext();

export function useFeed() {
    return useContext(FeedContext)
}

export const initialState = {
    selectedUserPosts: [], 
    selectedUserInfo: null,
    singlePost: null,
    feedPosts: [],
    explore: [],
    skip: 0,
    profileSkip: 0,
    exploreEndFetch: false,
    recommended: [],
    loading: true,
    error: null
};

export function FeedProvider({children}) {
    const [state, dispatch] = useReducer(feedReducer, initialState)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    const {unfollowFromFeed, state: {authenticated}} = useAuth()

    useEffect(() => {
        if (!authenticated) {
            return
        }
        axios.get("http://localhost:5000/").then(res => {
            console.log(res.data)
            dispatch({type: UPDATE_FEED, payload: res.data.timeline})
        }).catch(err => {
            console.error(err)
            dispatch({type: SET_ERRORS, payload:{error: "Something went wrong"}})
        })
    }, [authenticated])
    
    useEffect(() => {
        if (!authenticated) {
            return
        }
        axios.get("http://localhost:5000/explore/" + state.skip).then(res => {
            dispatch({type: SET_EXPLORE, payload: res.data.users})

        }).catch(err => {
            dispatch({type: SET_ERRORS, payload: {error: "Something went wrong"}})
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated])

    useEffect(() => {
        if(!authenticated) {
            return
        }
        axios.get("http://localhost:5000/recommended").then(res => {
            dispatch({type: SET_RECOMMENDED, payload: res.data.recommendedUsers})
        }).catch(err => {
            dispatch({type: SET_ERRORS, payload: {error: "Something went wrong"}})
        })
    }, [authenticated])

    const resetFeedState = () => {
        dispatch({type: RESET_STATE})
    }
    const likeUnlike = async (id) => {
        try {
            const res = await axios.put("http://localhost:5000/posts/"+ id)
            dispatch({type: LIKE_UNLIKE_POST, payload: res.data.updatedPost})

        } catch (err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed like/unlike action"}})
        }
    }
    const sendRequest = async (recipientId, current) => {
        let error =""
        try {
            const res = await axios.post("http://localhost:5000/users/"+ recipientId)
            dispatch({type: SEND_FOLLOW_REQUEST, payload: {updatedRecipient: res.data.updatedRecipient, current}})
        } catch (err) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to send follow request"}})
            error="Failed to send follow request"
        }
        return error
    }

    const cancelRequest = async(id, currentId) => {
        try {
            await axios.post("http://localhost:5000/users/"+ id + "/cancel")
            dispatch({type: CANCEL_REQUEST, payload: {canceled: id, currentId}})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to cancel follow request"}})
        }
    }

    const unfollow = async (id, currentId) => {
        try {
            await axios.post("http://localhost:5000/users/"+ id + "/unfollow")
            dispatch({type: UNFOLLOW, payload: currentId})
            unfollowFromFeed(id)
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to unfollow"}})
        }
    }
    const exploreMore = async () =>{
        try {
            const res = await axios.get("http://localhost:5000/explore/" + state.skip)
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
    const setUserProfile = async (id, history, set) => {
        try {
            const res = await axios.get("http://localhost:5000/users/"+ id + "/0")
            if(res.data.posts.length < 9) {
                set(true)
            }
            dispatch({type: SET_SELECTED_USER, payload: res.data})
        } catch (error) {            
            history.push("/")
            dispatch({type: SET_ERRORS, payload: {error: "Failed to find User"}})  
        }
    }
    const loadMoreProfilePosts = async (id, skip, setNoMorePhotosLeft) => {
        try {
            const res = await axios.get("http://localhost:5000/users/"+ id + "/" + (skip + state.profileSkip))
            console.log(res.data)
            if (res.data.posts.length < 9) {
                setNoMorePhotosLeft(true)
            }
            dispatch({type: LOAD_MORE_PROFILE_POSTS, payload: res.data.posts})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to delete Post"}})  
        }
    }
    const updateBio = async(bio) => {
        try {
            await axios.put("http://localhost:5000/users/bio", {bio})
            dispatch({type: UPDATE_BIO, payload: bio})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to update bio"}})    
        }
    }
    const updateImage = async (base64) => {
        try {
            const res = await axios.put("http://localhost:5000/users/profile_image", {profile_pic_url: base64})
            dispatch({type: UPDATE_PROFILE_PIC, payload: {url: base64, user: res.data.response}})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to update the image"}})    
        }
    }
    const resetProfile = () => {
        dispatch({type: RESET_USER_PROFILE})
    }
    const setSinglePost = async(id, history) => {
        try {
            const res = await axios.get("http://localhost:5000/posts/" + id)
            dispatch({type: SET_SINGLE_POST, payload: res.data.post})
        } catch (error) {
            history.push("/")
            dispatch({type: SET_ERRORS, payload: {error: "Failed to get the post"}})     
        }
    }
    const addPost = async(data, user) => {
        try {
            const res = await axios.post("http://localhost:5000/posts", data)
            dispatch({type: ADD_POST, payload: {post: res.data.post, user}})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: {error: "Failed to upload the post"}})       
        }
    }
    const resetSinglePost = () => {
        dispatch({type: RESET_SINGLE_POST})
    }
    const value = {
      state,
      likeUnlike,
      sendRequest,
      cancelRequest,
      unfollow,
      exploreMore,
      addComment,
      addPost,
      deleteComment,
      likeUnlikeComment,
      deletePost, 
      setUserProfile,
      loadMoreProfilePosts,
      resetProfile,
      setSinglePost, 
      resetSinglePost,
      updateBio,
      updateImage,
      resetFeedState
    }
      return (
          <FeedContext.Provider value={value}>
              {children}
          </FeedContext.Provider>
      )
  }