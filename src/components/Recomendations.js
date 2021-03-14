import React from 'react'
import {Link} from "react-router-dom"
import {Grid} from "semantic-ui-react"
import {useFeed } from "../context/feed/FeedContext"
import UserPreview from "./UserPreview"
export default function Recomendations() {
    const {state: {recommended}} = useFeed()
    return (
        <div className="fixed">
            <h2>Recommendations</h2>
            <Grid>
                <Grid.Column width={9}>
                    <p>We Recommend You</p>
                    {recommended.map(u => <UserPreview key={u._id} user={u}/>)}
                </Grid.Column>
                <Grid.Column width={7}>
                    <Link to="/explore">See More</Link>
                </Grid.Column>
            </Grid>
        </div>
    )
}
