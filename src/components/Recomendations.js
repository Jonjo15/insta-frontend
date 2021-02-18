import React from 'react'
import {Link} from "react-router-dom"
import {Grid, Button} from "semantic-ui-react"
export default function Recomendations() {
    // TODO: RECOMMENDED USERS STATE
    return (
        <div>
            <h2>Recommendations</h2>
            <Grid>
                <Grid.Column width={9}>
                    <p>We Recommend You</p>
                    {/* recomendations.map(m => <UserPreview>) */}
                </Grid.Column>
                <Grid.Column width={7}>
                    <Button content="See All" as={Link} to="/explore"/>
                </Grid.Column>
            </Grid>
        </div>
    )
}
