import React from 'react'
import {Card, Button, Image} from "semantic-ui-react" 
import { useAuth } from '../../context/auth/AuthContext'
export default function SingleRequest({request}) {
    const {acceptRequest, rejectRequest} = useAuth()
    const handleAccept = e => {
        e.target.disabled = true
        acceptRequest(request._id)
    }
    const handleReject = e => {
        e.target.disabled = true
        rejectRequest(request._id)
    }
    return (
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src={request.profile_pic_url}
                />
                <Card.Header>{request.username}</Card.Header>
                <Card.Description>
                {request.username} wants to become <strong>your follower</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button onClick={handleAccept} basic color='green'>
                    Approve
                </Button>
                <Button onClick={handleReject} basic color='red'>
                    Decline
                </Button>
                </div>
            </Card.Content>
        </Card>
    )
}
