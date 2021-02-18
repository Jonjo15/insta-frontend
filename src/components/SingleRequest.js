import React from 'react'
import {Card, Button, Image} from "semantic-ui-react" 
export default function SingleRequest({request}) {
    const handleAccept = e => {
        console.log("ey")
    }
    const handleReject = e => {
        console.log("eheh")
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
