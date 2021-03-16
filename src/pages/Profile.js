import React, {useEffect, useState} from 'react'
import {Container, Button} from "semantic-ui-react" 
import {useParams, useHistory} from "react-router-dom" 
import Skeleton from 'react-loading-skeleton';
import ProfileHeader from "../components/profile/ProfileHeader"
import { useAuth } from '../context/auth/AuthContext'
import {useFeed} from "../context/feed/FeedContext"
import ProfilePosts from '../components/profile/ProfilePosts'
export default function Profile() {
    const [skip, setSkip] = useState(9)
    const [noMorePhotosLeft, setNoMorePhotosLeft] = useState(false)
    const params = useParams()
    const history = useHistory()
    const {state: {currentUser}} = useAuth()
    const {setUserProfile,loadMoreProfilePosts, resetProfile, state: {selectedUserInfo, selectedUserPosts, postCount}} = useFeed()
    useEffect(() => {
        document.title = params.userId === currentUser._id ? "You" : "Profile"
        setUserProfile(params.userId, history, setNoMorePhotosLeft)

        return () => resetProfile()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.userId])
    const loadMore = e => {
        console.log("hey", skip)
        loadMoreProfilePosts(params.userId, skip, setNoMorePhotosLeft )
        setSkip(s => s + 9)
    }
    return (
        <Container className="mt-50">
            {!selectedUserInfo ? (<Skeleton height={150}/>) : (<ProfileHeader user={selectedUserInfo} postCount={postCount}/>)}
            <ProfilePosts posts={selectedUserPosts} userId={selectedUserInfo?._id}/>
            {selectedUserInfo && !noMorePhotosLeft && <Button disabled={noMorePhotosLeft} content="Load more images" onClick={loadMore}/>}
        </Container>
    )
}
