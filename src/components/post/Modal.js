import React, { useState } from 'react'
import { Modal, Image, Card, Button, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { Image as CloudinaryImage } from "cloudinary-react"
import LikeUnlike from "./LikeUnlike"
import CommentLikeUnlike from "./CommentLikeUnlike"
import { useFeed } from "../../context/feed/FeedContext"
import { useAuth } from "../../context/auth/AuthContext"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function PostModal({ post, open, setOpen }) {
    const { addComment, deleteComment } = useFeed()
    const { state: { currentUser } } = useAuth()
    const [body, setBody] = useState("")
    const handleSubmit = e => {
        e.preventDefault()
        addComment(post, currentUser, body)
        setBody("")
    }
    const handleDeleteComment = id => {
        console.log(id)
        deleteComment(id, post._id)
    }
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <div className="modal-grid">
                <Card fluid className="align-center">
                    <Image className="modal-post-image" src={post.picture} wrapped ui={false} />
                </Card>
                <div className="modal-right">
                    <div>
                        <Card fluid>
                            <Card.Content className="flex">
                                <CloudinaryImage
                                    cloudName="jonjo15"
                                    className="post-profile-pic"
                                    publicId={post.poster.profile_pic_url}
                                />
                                <Card.Header style={{ marginTop: 5, marginLeft: 5 }}><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link></Card.Header>
                            </Card.Content>
                        </Card>
                        <div className="comments">
                            <div className="comment-card bolder">
                                <p><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link> {post.body}</p>
                            </div>
                            <hr />
                            {post.comments.map(c => <div className="comment-container" key={c._id} >
                                <div className="comment-card">
                                    <p><Link to={"/users/" + c.commenter._id}>{c.commenter.username}</Link> {c.body}</p>
                                    {c.commenter._id === currentUser._id && <Icon onClick={(e) => handleDeleteComment(c._id)} name="delete" style={{ cursor: "pointer", justifySelf: "flex-end" }} />}
                                </div>
                                <CommentLikeUnlike comment={c} />
                            </div>)}
                            {post.comments.length === 0 && <p className="center">No comments yet</p>}
                        </div>
                    </div>
                    

                    <div className="modal-post-form">
                        <div className="w-100 p-10">
                            <LikeUnlike post={post} />
                        </div>
                        <div className="w-100 p-10">
                            <small>{dayjs(post.createdAt).fromNow()}</small>
                            <form className="comment-form" onSubmit={handleSubmit}>
                                <input placeholder="Post a comment" type="text" onChange={(e) => setBody(e.target.value)} value={body} />
                                <Button type="submit" content="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
