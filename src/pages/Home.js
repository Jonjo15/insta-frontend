import React from 'react'
import { Container, Grid } from "semantic-ui-react"
import {Redirect} from "react-router-dom"
import { useAuth } from '../context/auth/AuthContext'
import HomeFeed from '../components/HomeFeed'
import Recomendations from '../components/Recomendations'
export default function Home() {
    const {state: {authenticated, currentUser}} = useAuth()
    
    return (
        authenticated ? (<Container className="mt-50">
            <h1 className="center">Home </h1>
            {currentUser && <p>Hello {currentUser.username} {currentUser._id}</p>}
            {/* <p>{JSON.stringify(currentUser)}</p> */}
            <h2>Followers: {JSON.stringify(currentUser.followers) } {currentUser.followers.length}</h2>
            <h2>Requests: {JSON.stringify(currentUser.follow_requests)} {currentUser.follow_requests.length}</h2>
            <Grid>
                <Grid.Column width={12}>
                    <HomeFeed />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Recomendations />
                </Grid.Column>
            </Grid>
        </Container>) : <Redirect to="/auth"/>
        
    )
}
