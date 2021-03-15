import React from 'react'
import {Icon, Popup } from "semantic-ui-react"
import {useAuth} from "../../context/auth/AuthContext"
import { useFeed } from '../../context/feed/FeedContext'
import {useHistory} from "react-router-dom"
export default function LikeUnlike({post, singlePost}) {
    const {state: {currentUser}} = useAuth()
    const {likeUnlike, deletePost} = useFeed()
    const history = useHistory()
    const handleLike = e => {
        likeUnlike(post._id)
    }
    const handleDeletePost = e => {
        deletePost(post._id)
        if(singlePost) {
            history.push("/")
        }
    }
    return (
        <div className="post-like-unlike">
            <div>
                <Icon style={{cursor: "pointer"}} onClick={handleLike} color={post.likes.includes(currentUser._id) ? "red" : "grey"} size="large" name='like' />
                {post.likes.length === 1 ? "1 like" : post.likes.length.toString() + " likes"}
            </div>
            {post.poster._id === currentUser._id && <Popup content="Delete Post" trigger={<Icon onClick={handleDeletePost} name="delete" size="large" style={{cursor: "pointer", justifySelf: "flex-end"}}/>}/>}
        </div>
    )
}
