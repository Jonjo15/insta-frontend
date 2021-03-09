import React from 'react'
import PostPreview from "./PostPreview"
import {useAuth} from "../../context/auth/AuthContext"
export default function ProfilePosts({posts, userId}) {
    const {state: {currentUser: {following}}} = useAuth()
    return (
        following.includes(userId) ? (<div className="profile-grid">
            {posts.length === 0 && <p>No posts yet</p>}
            {posts.map(p => <PostPreview key={p._id} post={p}/>)}
        </div>) : (<p>You need to follow this user to see their posts</p>)
        
    )
}
