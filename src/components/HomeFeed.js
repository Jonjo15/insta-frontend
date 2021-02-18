import React from 'react'
import { useFeed } from '../context/feed/FeedContext'

export default function HomeFeed() {
    const {state: {feedPosts}} = useFeed()
    return (
        <div className="home-feed-container">
           {feedPosts.length === 0 && <p>There are no posts on your feed yet</p>} 
        </div>
    )
}
