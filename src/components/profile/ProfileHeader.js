import React from 'react'
import { useAuth } from '../../context/auth/AuthContext'
import {Image, Button, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"
import BioUpdateForm from './BioUpdate'
import { useFeed } from '../../context/feed/FeedContext'

export default function ProfileHeader({user, postCount}) {
    const { state: {currentUser}} = useAuth()
    const {cancelRequest, sendRequest, unfollow} = useFeed()
    const buttonContent = (user) => {
        if(user.follow_requests.includes(currentUser._id)) return "Cancel Request"
        if(user.followers.includes(currentUser._id)) return "Unfollow"
        return "Send a follow request"
    }
    const handleClick = e => {
        e.target.disabled = true
        if (e.target.textContent === "Send a follow request") {
            console.log("request sent")
            sendRequest(user._id, currentUser._id)
        }
        else if (e.target.textContent === "Unfollow") {
            console.log("unfollowed")
        } else if (e.target.textContent === "Cancel Request") {
            console.log("canceled")
            cancelRequest(user._id, currentUser._id)
        }
        e.target.disabled = false
    }
    const handleImageChange = e => {
        console.log("hey")
        document.getElementById("profile-pic-input").click()
    }
    return (
        <div className="container profile-header">
            <div>
                <Image size="small" circular src={user.profile_pic_url}/>
                {user._id === currentUser._id && <Icon onClick={handleImageChange} style={{cursor: "pointer"}} size="large" name="edit outline"/>}
            </div>
            <div className="profile-info">
                <div className="username">
                    <h1><Link to={"/users/"+ user._id}>{user.username}</Link></h1>
                   {currentUser._id !== user._id && <Button onClick={handleClick} content={buttonContent(user)}/>}
                </div>
                <span className="count">{postCount === 1 ? postCount + " photo" : postCount + " photos"}</span>
                <span className="count">{user.followers.length === 1 ? user.followers.length + " follower" : user.followers.length + " followers"}</span>
                <span className="count">{user.following.length === 1 ? user.following.length + " following" : user.following.length + " following"}</span>
                <p className="bio">{user.bio}</p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                {currentUser._id === user._id && <BioUpdateForm />}
            </div>
            <input id="profile-pic-input" type="file" hidden />
        </div>
    )
}
