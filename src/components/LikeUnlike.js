import React from 'react'
import {Icon } from "semantic-ui-react"
import {useAuth} from "../context/auth/AuthContext"
import { useFeed } from '../context/feed/FeedContext'
export default function LikeUnlike({post}) {
    const {state: {currentUser}} = useAuth()
    const {likeUnlike} = useFeed()
    const handleLike = e => {
        console.log("to be continued")
        likeUnlike(post._id)
    }
    return (
        <>
            <Icon onClick={handleLike} color={post.likes.includes(currentUser._id) ? "red" : "grey"} size="large" name='like' />
            {post.likes.length === 1 ? "1 like" : post.likes.length.toString() + " likes"}
        </>
    )
}
