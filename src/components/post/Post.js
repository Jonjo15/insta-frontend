import React, {useState} from 'react'
import {Card, Image } from "semantic-ui-react"
import {Link} from "react-router-dom"
import LikeUnlike from "./LikeUnlike"
import dayjs from "dayjs"
import Modal from "./Modal"
import {Image as CloudinaryImage} from "cloudinary-react"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function Post({post}) {
    const [open, setOpen] = useState(false)
    return (
        <Card fluid>
            <Card.Header>
                <Card fluid>
                    <Card.Content className="flex">
                        <CloudinaryImage
                            cloudName="jonjo15"
                            className="post-profile-pic"
                            publicId={post.poster.profile_public_id}
                        />
                        <Card.Header style={{marginTop: 5, marginLeft: 5}}><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link></Card.Header>
                    </Card.Content>
                </Card>
            </Card.Header>
            <Image style={{cursor: "pointer"}} src={post.picture} wrapped ui={false} onClick={e => setOpen(true)}/>
            <Card.Content>
                <Card.Meta>
                    <span className='date'>{dayjs(post.createdAt).fromNow()}</span>
                </Card.Meta>
                <Card.Description>
                    <Link className="mr-10 bolder" to={"/users/" + post.poster._id}>{post.poster.username}</Link> {post.body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeUnlike post={post}/>
                <Modal post={post} open={open} setOpen={setOpen}/>
            {post.comments.length === 0 && <Card.Description className="py-2">No comments yet</Card.Description>}
            {post.comments.length > 0 && <Card.Description className="py-2"><Link className="mr-10 bolder" to={"/users/"+ post.comments[post.comments.length -1].commenter._id}>{post.comments[post.comments.length - 1].commenter.username}</Link>{post.comments[post.comments.length -1].body}</Card.Description>}
            </Card.Content>
        </Card>
    )
}
