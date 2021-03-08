import React, {useEffect} from 'react'
import {Container} from "semantic-ui-react" 
import {useParams} from "react-router-dom" 
import ProfileHeader from "../components/profile/ProfileHeader"
import { useAuth } from '../context/auth/AuthContext'
export default function Profile() {
    const params = useParams()
    const {state: {currentUser}} = useAuth()
    useEffect(() => {
        document.title = params.userId === currentUser._id ? "You" : "Profile"

        // TODO: SEND REQUEST TO BACKEND WITH FEED CONTEXT
    }, [currentUser._id, params.userId])
    return (
        <Container className="mt-50">
            <ProfileHeader />
            <h1 className="center">Profile Page</h1>
        </Container>
    )
}
