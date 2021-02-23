import React from 'react'
import {Icon } from "semantic-ui-react"
import {useAuth} from "../context/auth/AuthContext"
export default function LikeUnlike({post}) {
    const {state: {currentUser}} = useAuth()
    const handleLike = e => {
        console.log("to be continued")
    }
    return (
        <a >
            <Icon onClick={handleLike} color={post.likes.includes(currentUser._id) ? "red" : "grey"} size="large" name='like' />
            {post.likes.length === 1 ? "1 like" : post.likes.length.toString() + " likes"}
        </a>
    )
}
