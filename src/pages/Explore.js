import React from 'react'
import {Container, Button} from "semantic-ui-react"
import {useFeed} from "../context/feed/FeedContext"
import UserPreview from "../components/util/UserPreview"
export default function Explore() {
    const {exploreMore, state: {explore, exploreEndFetch}} = useFeed()
    const handleClick = e => {
        if (exploreEndFetch) return;
        exploreMore()
    }
    return (
        <Container className="mt-50">
           <h1 className="center">Explore Users</h1> 
           <div className="explore-grid">
                {explore.length === 0 && <p>No users yet</p>}
                {explore.map(u => <UserPreview key={u._id} user={u}/>)}
           </div>
           {!exploreEndFetch && <div className="center mt-50" style={{paddingBottom: 50}}>
                <Button onClick={handleClick} disabled={exploreEndFetch} className="center" content="Load more"/>
           </div>}
           {exploreEndFetch && <small>No more users to load</small>}
        </Container >
    )
}
