import React from 'react'
import { useFeed } from '../context/feed/FeedContext'
import Post from "./Post"
export default function HomeFeed() {
    const {state: {feedPosts, loading}} = useFeed()
    return (
        loading ? <div>...loading</div> :
        <div className="home-feed-container">
           {feedPosts.length === 0 && <p>There are no posts on your feed yet</p>} 
           {feedPosts.map(f => <Post key={f._id} post={f} />)}
        </div>
    )
}
