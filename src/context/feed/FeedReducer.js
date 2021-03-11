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
    UPDATE_BIO,
    UNFOLLOW,
    CANCEL_REQUEST
     } from "./types";

export default function feedReducer (state, action){
    let feedCopy;
    let newFeed;
    switch(action.type) {
        case CANCEL_REQUEST: 
            return {
                ...state,
                selectedUserInfo: state.selectedUserInfo ? {...state.selectedUserInfo, follow_requests: [...state.selectedUserInfo.follow_requests.filter(id => id !== action.payload.currentId)]} : state.selectedUserInfo,
                explore: state.explore.map(u => {
                    if (u._id === action.payload.canceled) {
                        u.follow_requests = u.follow_requests.filter(id => id !== action.payload.currentId )
                        return u
                    }
                    else return u
                }),
                recommended: state.recommended.map(u => {
                    if (u._id === action.payload.canceled) {
                        u.follow_requests = u.follow_requests.filter(id => id !== action.payload.currentId)
                        return u
                    }
                    else {
                        return u
                    } 
                })
            }
        case UNFOLLOW: 
            return {
                // TODO: TEST THIS OUT
                ...state,
                selectedUserInfo: {...state.selectedUserInfo, followers: [...state.selectedUserInfo.followers.filter(id => id !== action.payload)]},
                selectedUserPosts: []
            }
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
            return {
                ...state,
                singlePost: action.payload
            }
        case RESET_SINGLE_POST: 
            return {
                ...state,
                singlePost: null,
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
            console.log(state.recommended, "REDUCER")
            return {
                ...state,
                explore: state.explore.map(u => {
                    if (u._id !== action.payload.updatedRecipient._id) {
                        return u
                    } else {
                        return action.payload.updatedRecipient
                    }
                }),
                recommended: state.recommended.map(u => {
                    if (u._id !== action.payload.updatedRecipient._id) {
                        return u
                    } else {
                        return {...action.payload.updatedRecipient}
                    }
                }),
                selectedUserInfo: state.selectedUserInfo?._id === action.payload.updatedRecipient._id ? ({...state.selectedUserInfo, follow_requests: [...state.selectedUserInfo.follow_requests, action.payload.current]}) : (state.selectedUserInfo)
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
            // TODO: ADD STUFF FOR SINGLE POST
            return {
                ...state,
                feedPosts: state.feedPosts.filter(p => p._id !== action.payload),
                selectedUserPosts: state.selectedUserPosts.filter(p => p._id !== action.payload),
                singlePost: state.singlePost && state.singlePost._id === action.payload ? null : state.singlePost 
            }
        case DELETE_COMMENT: 
        // TODO: TEST 
        return {
            ...state,
            singlePost: state.singlePost && state.singlePost._id === action.payload.postId ?
                {...state.singlePost, comments: state.singlePost.comments.filter(c => c._id !== action.payload.commentId)}
                : state.singlePost,
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
        // TODO: TEST
            return {
                ...state,
                singlePost: state.singlePost && state.singlePost._id === action.payload.postId ? 
                {...state.singlePost, comments: state.singlePost.comments.map(c => {
                    if (c._id !== action.payload.updatedComment._id) {
                        return c
                    } else {
                        return {...action.payload.updatedComment, commenter: c.commenter}
                    }
                })}
                : 
                state.singlePost,
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
        // TODO: TEST
            feedCopy = state.feedPosts;
            newFeed = feedCopy.map(p => {
                if (p._id === action.payload._id) {
                    return {...action.payload, poster: p.poster}
                }
                else return p
            })
            return {
                ...state,
                singlePost: state.singlePost && state.singlePost._id === action.payload._id ? 
                {...action.payload, poster: state.singlePost.poster}
                :
                state.singlePost,
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
            // TODO: PROBABLY REMOVE BELOW
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