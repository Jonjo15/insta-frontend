import React, { useState } from 'react'
import { Modal, Image, Card, Button } from "semantic-ui-react"
import {Link} from "react-router-dom"
import dayjs from "dayjs"

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function PostModal({post, open, setOpen}) {
    // const [open, setOpen] = useState(false)
    const [body, setBody] = useState("")
    const handleSubmit = e => {
        e.preventDefault()
        console.log("submit")
    }
    return (
            <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            >
                <div className="modal-grid">
                    <Card fluid>
                            {/* TODO: CARD BELOW TO THE OTHER SIDE */}
                            <Card fluid>
                                <Image src={post.poster.profile_pic_url} wrapped ui={false}/>
                            </Card>
                    </Card>
                    <div className="modal-right">
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
                        {/* TODO: REPLACE BELOW WITH CUSTOM HTML THIS IS GARBAGE */}
                        <div className="comments">
                            <div className="comment-card">
                                <p><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link> {post.body}</p>
                            </div>
                            {post.comments.map(c => <div className="comment-card">
                                <p><Link to={"/users/" + c.commenter._id}>{c.commenter.username}</Link> {c.body}</p>
                            </div> )}
                            {post.comments.length === 0 && <p className="center">No comments yet</p>}
                        </div>
                        <div className="modal-post-form">
                            <div className="w-100">

                                <form className="comment-form" onSubmit={handleSubmit}>
                                    <input placeholder="Post a comment" type="text" onChange={(e) => setBody(e.target.value)} value={body}/>
                                    <Button type="submit" content="Submit"/>
                                </form>
                            </div>
                        </div>
                        {/* <Card fluid>
                            <Card.Content>
                                <Card.Description>
                                    <Image
                                        circular
                                        floated='left'
                                        size='mini'
                                        src={post.poster.profile_pic_url}
                                        />
                                    <Link className="mr-10" to={"/users/" + post.poster._id}>{post.poster.username}</Link> {post.body}
                                </Card.Description>
                                <Card.Meta>
                                    <span className='date'>{dayjs(post.createdAt).fromNow()}</span>
                                </Card.Meta>
                            </Card.Content>
                        </Card> */}
                    </div>
                </div>
            </Modal>
    )
}
