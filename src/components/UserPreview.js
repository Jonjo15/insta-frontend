import React from 'react'
import {Card, Image, Button} from "semantic-ui-react"
import {useAuth} from "../context/auth/AuthContext"
import {Link} from "react-router-dom"
const createMetaText = (followers, userId) => {
    let ids = followers.map(f => f._id)
    let text = ids.includes(userId) ? "Follows you" : "Does not follow you"
    return text
}
export default function UserPreview({user}) {
    const {state: {currentUser: {followers}}} = useAuth()

    const handleClick = e => {
        console.log("send request")
    }
    return (
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src={user.profile_pic_url}
                />
                <Card.Header><Link to={"/users/" + user._id}>{user.username}</Link></Card.Header>
                <Card.Meta>{createMetaText(followers, user._id)}</Card.Meta>
                {/* <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description> */}
            </Card.Content>
            <Card.Content extra>
                <Button onClick={handleClick} basic color='green'>
                    Send a follow request
                </Button>
            </Card.Content>
        </Card>
    )
}
