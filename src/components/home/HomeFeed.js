import React from 'react'
import { useFeed } from '../../context/feed/FeedContext'
import Post from "../post/Post"
import Skeleton from "react-loading-skeleton"
export default function HomeFeed() {
    const {state: {feedPosts, loading}} = useFeed()
    return (
        loading ? <Skeleton height={500} /> :
        <div className="home-feed-container">
           {feedPosts.length === 0 && <p>There are no posts on your feed yet</p>} 
           {feedPosts.map(f => <Post key={f._id} post={f} />)}
        </div>
    )
}
