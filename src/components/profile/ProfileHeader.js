import React, { useState } from 'react'
import { useAuth } from '../../context/auth/AuthContext'
import { Image, Button, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import BioUpdateForm from './BioUpdate'
import { useFeed } from '../../context/feed/FeedContext'

export default function ProfileHeader({ user, postCount }) {
    const { state: { currentUser } } = useAuth()
    const { cancelRequest, sendRequest, updateImage } = useFeed()
    // const [imageFile, setImageFile] = useState()
    const [error, setError] = useState(null)
    const fileTypes = ["image/png", "image/jpeg"]
    const buttonContent = (user) => {
        if (user.follow_requests.includes(currentUser._id)) return "Cancel Request"
        if (user.followers.includes(currentUser._id)) return "Unfollow"
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
        let file = e.target.files[0];
        if (file && fileTypes.includes(file.type)) {
            setError(null)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', "moxqjptj");
                fetch("https://api.cloudinary.com/v1_1/jonjo15/image/upload", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    body: formData
                  })
                  .then(res => {return res.json()})
                  .then(img => updateImage(img.secure_url))
                  .catch(err => console.log(err));
            };
            reader.onerror = () => {
                console.error('AHHHHHHHH!!');
                setError('something went wrong!');
            };
        }
        else {
            setError("Choose the right file type (image/png or image/jpeg)")
        }
    }
    return (
        <div className="container profile-header">
            <div>
                <Image bordered size="small" circular src={user.profile_pic_url} />
                {user._id === currentUser._id && <Icon onClick={(e) => document.getElementById("profile-pic-input").click()} style={{ cursor: "pointer" }} size="large" name="edit outline" />}
                {error && <p>{error}</p>}
            </div>
            <div className="profile-info">
                <div className="username">
                    <h1><Link to={"/users/" + user._id}>{user.username}</Link></h1>
                    {currentUser._id !== user._id && <Button onClick={handleClick} content={buttonContent(user)} />}
                </div>
                <span className="count">{postCount === 1 ? postCount + " photo" : postCount + " photos"}</span>
                <span className="count">{user.followers.length === 1 ? user.followers.length + " follower" : user.followers.length + " followers"}</span>
                <span className="count">{user.following.length === 1 ? user.following.length + " following" : user.following.length + " following"}</span>
                <p className="bio">{user.bio}</p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                {currentUser._id === user._id && <BioUpdateForm />}
            </div>
            <input id="profile-pic-input" type="file" hidden onChange={handleImageChange} />
        </div>
    )
}
