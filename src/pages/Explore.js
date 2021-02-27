import React from 'react'
import {Container, Button} from "semantic-ui-react"
import {useFeed} from "../context/feed/FeedContext"
import UserPreview from "../components/UserPreview"
export default function Explore() {
    const {state: {explore}} = useFeed()

    const handleClick = e => {
        e.target.disabled = true
        console.log("load-more")
    }
    return (
        <Container className="mt-50">
           <h1 className="center">Explore Users</h1> 
           <div className="explore-grid">
                {explore.length === 0 && <p>No users yet</p>}
                {explore.map(u => <UserPreview key={u._id} user={u}/>)}
           </div>
           <div className="center mt-50" style={{paddingBottom: 50}}>
                <Button onClick={handleClick} className="center" content="Load more"/>
           </div>
           
        </Container >
    )
}
