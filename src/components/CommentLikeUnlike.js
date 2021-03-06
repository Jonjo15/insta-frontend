import React from 'react'
import {Icon} from "semantic-ui-react"
import {useAuth} from "../context/auth/AuthContext"
export default function CommentLikeUnlike({comment}) {
    const {state: {currentUser}} = useAuth()
    const handleLike = e => {
        console.log("like")
    }
    return (
         <div className="comment-like-unlike">
            <Icon style={{cursor: "pointer"}} onClick={handleLike} color={comment.likes.includes(currentUser._id) ? "red" : "grey"} size="small" name='like' />
            {comment.likes.length === 1 ? <small>"1 like"</small> : <small>{comment.likes.length.toString() + " likes"}</small> }
        </div>
    )
}
