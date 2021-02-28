import React from 'react'
import {Link} from "react-router-dom"
import {Grid, Button} from "semantic-ui-react"
import {useFeed } from "../context/feed/FeedContext"
import UserPreview from "./UserPreview"
export default function Recomendations() {
    // TODO: RECOMMENDED USERS STATE
    const {state: {recommended}} = useFeed()
    return (
        <div>
            <h2>Recommendations</h2>
            <Grid>
                <Grid.Column width={9}>
                    <p>We Recommend You</p>
                    {recommended.map(u => <UserPreview key={u._id} user={u}/>)}
                    {/* recomendations.map(m => <UserPreview>) */}
                </Grid.Column>
                <Grid.Column width={7}>
                    {/* <Button content="See All" as={Link} to="/explore"/> */}
                    <Link to="/explore">See More</Link>
                </Grid.Column>
            </Grid>
        </div>
    )
}
