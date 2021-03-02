import React, {useState}  from 'react'
import {Card, Image, Button} from "semantic-ui-react"
import {useAuth} from "../context/auth/AuthContext"
import {useFeed} from "../context/feed/FeedContext"
import {Link} from "react-router-dom"
const createMetaText = (followers, userId) => {
    let ids = followers.map(f => f._id)
    let text = ids.includes(userId) ? "Follows you" : "Does not follow you"
    return text
}
export default function UserPreview({user}) {
    const {state: {currentUser: {followers, _id}}} = useAuth()
    const {sendRequest} = useFeed()
    const [sent, setSent] = useState(false)
    const handleClick = e => {
        e.target.disabled = true;
        setSent(true)
        sendRequest(user._id)
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
            </Card.Content>
            <Card.Content extra>
                <Button onClick={handleClick} disabled={user.follow_requests.includes(_id)} basic color='green'>
                    {user.follow_requests.includes(_id) || sent ? "Sent" : "Send a follow request"}
                </Button>
            </Card.Content>
        </Card>
    )
}
