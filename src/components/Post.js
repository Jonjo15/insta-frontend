import React, {useState} from 'react'
import {Card, Image } from "semantic-ui-react"
import {Link} from "react-router-dom"
import LikeUnlike from "./LikeUnlike"
import dayjs from "dayjs"
import Modal from "./Modal"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function Post({post}) {
    const [open, setOpen] = useState(false)
    return (
        <Card fluid>
            <Card.Header>
                <Card fluid>
                    <Card.Content>
                        <Image
                        circular
                        floated='left'
                        size='mini'
                        src={post.poster.profile_pic_url}
                        />
                        <Card.Header style={{marginTop: 5, marginLeft: 5}}><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link></Card.Header>
                    </Card.Content>
                </Card>
            </Card.Header>
            {/* TODO: CHANGE BELOW TO INCLUDE POST PICTURE INSTEAD OF PROFILE PICTURE FOR TESTING */}
            <Image src={post.poster.profile_pic_url} wrapped ui={false} onClick={e => setOpen(true)}/>
            <Card.Content>
                <Card.Meta>
                    <span className='date'>{dayjs(post.createdAt).fromNow()}</span>
                </Card.Meta>
                {post.body && <Card.Description>
                    <Link className="mr-10" to={"/users/" + post.poster._id}>{post.poster.username}</Link> {post.body}
                </Card.Description>}
            </Card.Content>
            <Card.Content extra>
                <LikeUnlike post={post}/>
                <Modal post={post} open={open} setOpen={setOpen}/>
            {post.comments.length === 0 && <Card.Description>No comments yet</Card.Description>}
            {post.comments.length > 0 && <Card.Description>{post.comments[post.comments.length - 1].commenter.username}</Card.Description>}
            </Card.Content>
        </Card>
    )
}
