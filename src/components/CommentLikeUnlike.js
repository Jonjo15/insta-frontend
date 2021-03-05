import React from 'react'
import {Icon} from "semantic-ui-react"
import {useAuth} from "../context/auth/AuthContext"
export default function CommentLikeUnlike({comment}) {
    const {state: {currentUser}} = useAuth()
    const handleLike = e => {
        console.log("like")
    }
    return (
         <>
            <Icon style={{cursor: "pointer"}} onClick={handleLike} color={comment.likes.includes(currentUser._id) ? "red" : "grey"} size="tiny" name='like' />
            {comment.likes.length === 1 ? "1 like" : comment.likes.length.toString() + " likes"}
        </>
    )
}
