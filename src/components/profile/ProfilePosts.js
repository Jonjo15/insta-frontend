import React from 'react'
import PostPreview from "./PostPreview"
export default function ProfilePosts({posts}) {
    return (
        <div className="profile-grid">
            {posts.length === 0 && <p>No posts yet</p>}
            {posts.map(p => <PostPreview key={p._id} post={p}/>)}
        </div>
    )
}
