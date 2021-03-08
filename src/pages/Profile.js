import React, {useEffect, useState} from 'react'
import {Container, Button} from "semantic-ui-react" 
import {useParams} from "react-router-dom" 
import ProfileHeader from "../components/profile/ProfileHeader"
import { useAuth } from '../context/auth/AuthContext'
import {useFeed} from "../context/feed/FeedContext"
import ProfilePosts from '../components/profile/ProfilePosts'
export default function Profile() {
    const [skip, setSkip] = useState(9)
    const params = useParams()
    const {state: {currentUser}} = useAuth()
    const {setUserProfile, state: {selectedUserInfo, selectedUserPosts, loadMoreProfilePosts}} = useFeed()
    useEffect(() => {
        document.title = params.userId === currentUser._id ? "You" : "Profile"
        setUserProfile(params.userId)
        
        // TODO: SEND REQUEST TO BACKEND WITH FEED CONTEXT
        // TODO: RESET USER INFO ON UNMOUNTING
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const loadMore = e => {
        loadMoreProfilePosts(skip)
        setSkip(s => s + 9)
    }
    return (
        <Container className="mt-50">
            <ProfileHeader user={selectedUserInfo}/>
            <ProfilePosts posts={selectedUserPosts}/>
            <Button content="Load more images" onClick={() => loadMore()}/>
        </Container>
    )
}
