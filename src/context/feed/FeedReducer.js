import { 
    SET_SELECTED_USER,
    UPDATE_FEED,
    CLEAR_ERRORS,
    SET_ERRORS,
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
    CANCEL_REQUEST,
    LOAD_MORE_PROFILE_POSTS,
    RESET_STATE
     } from "./types";
import {initialState} from "./FeedContext"
export default function feedReducer (state, action){
    let feedCopy;
    let newFeed;
    switch(action.type) {
        case RESET_STATE: 
            return initialState
        case LOAD_MORE_PROFILE_POSTS: 
            return {
                ...state,
                selectedUserPosts: [...state.selectedUserPosts, ...action.payload]
            }
        case CANCEL_REQUEST: 
            return {
                ...state,
                selectedUserInfo: state.selectedUserInfo ? {...state.selectedUserInfo, follow_requests: [...state.selectedUserInfo.follow_requests.filter(f => f._id !== action.payload.currentId)]} : state.selectedUserInfo,
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
                ...state,
                selectedUserInfo: {...state.selectedUserInfo, followers: [...state.selectedUserInfo.followers.filter(f => f._id !== action.payload)]},
                selectedUserPosts: []
            }
        case UPDATE_PROFILE_PIC:
            return {
                ...state,
                selectedUserInfo: {...state.selectedUserInfo, profile_pic_url: action.payload.user.profile_pic_url, profile_public_id: action.payload.user.profile_public_id},
                selectedUserPosts: state.selectedUserPosts.map(p => {
                    if (p.poster._id !== state.selectedUserInfo._id) {
                        return p
                    } else {
                        return {...p, poster: {...p.poster, profile_pic_url: action.payload.user.profile_pic_url, profile_public_id: action.payload.user.profile_public_id}}
                    }
                }),
                feedPosts: state.feedPosts.length > 0 ? state.feedPosts.map(p => {
                    if(p?.poster?._id !== action.payload.user._id) {
                        return p
                    } else {
                        return {...p, poster: {...p.poster, profile_pic_url: action.payload.user.profile_pic_url, profile_public_id: action.payload.user.profile_public_id}}
                    }
                }) : state.feedPosts
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
                profileSkip: 0,
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
                selectedUserInfo: state.selectedUserInfo?._id === action.payload.updatedRecipient._id ? ({...state.selectedUserInfo, follow_requests: [...state.selectedUserInfo.follow_requests, {_id: action.payload.current}]}) : (state.selectedUserInfo)
            }
        case ADD_POST: 
            return {
                ...state,
                profileSkip: state.profileSkip + 1,
                postCount: state.postCount ? state.postCount + 1 : null,
                feedPosts: [{...action.payload.post, poster: {
                    _id: action.payload.user._id,
                    username: action.payload.user.username,
                    profile_pic_url: action.payload.user.profile_pic_url,
                    profile_public_id: action.payload.user.profile_public_id
                }}, ...state.feedPosts],
                selectedUserPosts: [{...action.payload.post, poster: {
                    _id: action.payload.user._id,
                    username: action.payload.user.username,
                    profile_pic_url: action.payload.user.profile_pic_url,
                    profile_public_id: action.payload.user.profile_public_id
                }}, ...state.selectedUserPosts]
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
                }),
                singlePost: state.singlePost && action.payload.updatedPost._id === state.singlePost._id ?
                {...state.singlePost, poster: state.singlePost.poster, comments: [...state.singlePost.comments, {...action.payload.comment, commenter: {
                    username: action.payload.currentUser.username,
                    _id: action.payload.currentUser._id,
                    profile_pic_url: action.payload.currentUser.profile_pic_url
                }}]} : null
            }
        case DELETE_POST:
            return {
                ...state,
                feedPosts: state.feedPosts.filter(p => p._id !== action.payload),
                selectedUserPosts: state.selectedUserPosts.filter(p => p._id !== action.payload),
                singlePost: state.singlePost && state.singlePost._id === action.payload ? null : state.singlePost 
            }
        case DELETE_COMMENT: 
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
            feedCopy = state.feedPosts;
            newFeed = feedCopy.map(p => {
                if (p._id === action.payload._id) {
                    return {...action.payload, poster: p.poster, comments: p.comments}
                }
                else return p
            })
            return {
                ...state,
                singlePost: state.singlePost && state.singlePost._id === action.payload._id ? 
                {...action.payload, poster: state.singlePost.poster, comments: state.singlePost.comments}
                :
                state.singlePost,
                feedPosts: newFeed,
                selectedUserPosts: state.selectedUserPosts.map(p => {
                    if(p._id === action.payload._id) {
                        return {...action.payload, poster: p.poster, comments: p.comments}
                    }
                    else {
                        return p
                    }
                })
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