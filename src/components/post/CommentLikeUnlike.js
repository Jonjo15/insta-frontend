import React from 'react'
import {Icon} from "semantic-ui-react"
import {useAuth} from "../../context/auth/AuthContext"
import {useFeed} from "../../context/feed/FeedContext"
export default function CommentLikeUnlike({comment}) {
    const {state: {currentUser}} = useAuth()
    const {likeUnlikeComment} = useFeed()
    const handleLike = e => {
        likeUnlikeComment(comment._id, comment.post)
    }
    return (
         <div className="comment-like-unlike">
            <Icon style={{cursor: "pointer"}} onClick={handleLike} color={comment.likes.includes(currentUser._id) ? "red" : "grey"} size="small" name='like' />
            {comment.likes.length === 1 ? <small>1 like</small> : <small>{comment.likes.length.toString()} likes</small> }
        </div>
    )
}
