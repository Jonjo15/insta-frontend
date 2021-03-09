import { 
    SET_SELECTED_USER,
    UPDATE_FEED,
    CLEAR_ERRORS,
    SET_ERRORS,
    UPDATE_USER,
    LIKE_UNLIKE_POST, 
    LIKE_UNLIKE_COMMENT, 
    ADD_COMMENT, 
    ADD_POST, 
    DELETE_COMMENT, 
    DELETE_POST,
    SEND_FOLLOW_REQUEST,
    SET_EXPLORE,
    ADD_EXPLORE,
    SET_RECOMMENDED,
    RESET_USER_PROFILE,
    SET_SINGLE_POST,
    RESET_SINGLE_POST,
    UPDATE_PROFILE_PIC,
    UPDATE_BIO
     } from "./types";

export default function feedReducer (state, action){
    let feedCopy;
    let newFeed;
    switch(action.type) {
        case UPDATE_PROFILE_PIC: 
            return {
                ...state,
                selectedUserInfo: {...state.selectedUserInfo, profile_pic_url: action.payload}
            }
        case UPDATE_BIO: 
            return {
                ...state,
                selectedUserInfo: {...state.selectedUserInfo, bio: action.payload}
            }
        case SET_SINGLE_POST:
            // TODO: FINSIH
            return {
                ...state
            }
        case RESET_SINGLE_POST: 
        // TODO: FINSIH
            return {
                ...state
            }
        case RESET_USER_PROFILE: 
            return {
                ...state,
                selectedUserPosts: [],
                selectedUserInfo: null,
                postCount: 0,
            }
        case UPDATE_FEED: 
            return {
              ...state,
              feedPosts: action.payload,
              loading: false
            }
        case SET_RECOMMENDED:
            return {
                ...state,
                recommended: action.payload
            }
        case SET_EXPLORE: 
            return {
                ...state,
                skip: state.skip + 25,
                explore: action.payload,
                exploreEndFetch: action.payload.length < 25 ? true : false
            }
        case ADD_EXPLORE:
            return {
                ...state,
                explore: [...state.explore, ...action.payload],
                exploreEndFetch: action.payload.length < 25 ? true : false,
                skip: state.skip + 25
            }
        case SEND_FOLLOW_REQUEST:
            return {
                ...state,
                explore: state.explore.map(u => {
                    if (u._id !== action.payload._id) {
                        return u
                    } else {
                        return action.payload
                    }
                }),
                recommended: state.recommended.map(u => {
                    if (u._id !== action.payload._id) {
                        return u
                    } else {
                        return action.payload
                    }
                })
            }
        case ADD_POST: 
            //TODO:
            return {
                ...state
            }
        case ADD_COMMENT: 
            return {
                ...state,
                feedPosts: state.feedPosts.map(p => {
                    if (p._id !== action.payload.post._id) {
                        return p
                    } else {
                        return {...action.payload.updatedPost, poster: p.poster, comments: [...p.comments, {...action.payload.comment, commenter: {
                            username: action.payload.currentUser.username,
                            _id: action.payload.currentUser._id,
                            profile_pic_url: action.payload.currentUser.profile_pic_url
                        }}]}
                    }
                }),
                selectedUserPosts: state.selectedUserPosts.map(p => {
                    if (p._id !== action.payload.post._id) {
                        return p
                    } else {
                        return {...action.payload.updatedPost, poster: p.poster, comments: [...p.comments, {...action.payload.comment, commenter: {
                            username: action.payload.currentUser.username,
                            _id: action.payload.currentUser._id,
                            profile_pic_url: action.payload.currentUser.profile_pic_url
                        }}]}
                    }
                })
            }
        case DELETE_POST:
            return {
                ...state,
                feedPosts: state.feedPosts.filter(p => p._id !== action.payload),
                selectedUserPosts: state.selectedUserPosts.filter(p => p._id !== action.payload)
            }
        case DELETE_COMMENT: 
        return {
            ...state,
            feedPosts: state.feedPosts.map(p => {
                if(p._id !== action.payload.postId) {
                    return p
                }
                else {
                    return {
                        ...p,
                        comments: p.comments.filter(c => c._id !== action.payload.commentId)
                    }
                }
            }),
            selectedUserPosts: state.selectedUserPosts.map(p => {
                if(p._id !== action.payload.postId) {
                    return p
                }
                else {
                    return {
                        ...p,
                        comments: p.comments.filter(c => c._id !== action.payload.commentId)
                    }
                }
            })
        }
        case LIKE_UNLIKE_COMMENT: 
            return {
                ...state,
                feedPosts: state.feedPosts.map(p => {
                    if (p._id !== action.payload.postId) {
                        return p
                    } 
                    else {
                        return {...p, comments: p.comments.map(c => {
                            if (c._id !== action.payload.updatedComment._id) {
                                return c
                            } else {
                                return {...action.payload.updatedComment, commenter: c.commenter}
                            }
                        })}
                    }
                }),
                selectedUserPosts: state.selectedUserPosts.map(p => {
                    if (p._id !== action.payload.postId) {
                        return p
                    } 
                    else {
                        return {...p, comments: p.comments.map(c => {
                            if (c._id !== action.payload.updatedComment._id) {
                                return c
                            } else {
                                return {...action.payload.updatedComment, commenter: c.commenter}
                            }
                        })}
                    }
                })
            }
        case LIKE_UNLIKE_POST: 
            feedCopy = state.feedPosts;
            newFeed = feedCopy.map(p => {
                if (p._id === action.payload._id) {
                    return {...action.payload, poster: p.poster}
                }
                else return p
            })
            return {
                ...state,
                feedPosts: newFeed,
                selectedUserPosts: state.selectedUserPosts.map(p => {
                    if(p._id === action.payload._id) {
                        return {...action.payload, poster: p.poster}
                    }
                    else {
                        return p
                    }
                })
            }
        case UPDATE_USER: 
            return {
                ...state,
                //TODO:
            }
        case SET_SELECTED_USER:
            return {
                ...state,
                selectedUserInfo: action.payload.user,
                selectedUserPosts: action.payload.posts,
                postCount: action.payload.postCount
            }
        case SET_ERRORS: 
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }
      default:
        return state;
    }
  }