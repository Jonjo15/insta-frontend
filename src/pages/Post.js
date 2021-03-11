import React, {useState, useEffect} from 'react'
import { Container, Button, Image, Card, Icon } from "semantic-ui-react"
import {Link, useParams} from "react-router-dom"
import LikeUnlike from "../components/LikeUnlike"
import CommentLikeUnlike from "../components/CommentLikeUnlike"
import dayjs from "dayjs"
import {useAuth} from "../context/auth/AuthContext"
import {useFeed} from "../context/feed/FeedContext"

export default function Post() {
    const params = useParams()
    const [body, setBody] = useState("")
    const {state: {currentUser}} = useAuth()
    const {setSinglePost, resetSinglePost, addComment, deleteComment, state: {singlePost: post}} = useFeed()
    const handleSubmit = e => {
        e.preventDefault()
        addComment(post, currentUser, body)
        setBody("")
        console.log("submit")
    }
    const handleDeleteComment = id => {
        console.log(id)
        deleteComment(id, post._id)
    }
    useEffect(() => {
        setSinglePost(params.postId)

        return () => resetSinglePost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.postId])
    return (
        <Container className="mt-50">
            <div className="modal-grid">
                    <Card fluid>
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
                        <div className="comments">
                            <div className="comment-card bolder">
                                <p><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link> {post.body}</p>
                            </div>
                           <hr/> 
                            {post.comments.map(c => <div className="comment-container" key={c._id} >
                                <div className="comment-card">
                                    <p><Link to={"/users/" + c.commenter._id}>{c.commenter.username}</Link> {c.body}</p>
                                    {c.commenter._id === currentUser._id && <Icon onClick={(e) => handleDeleteComment(c._id)} name="delete" style={{cursor: "pointer", justifySelf: "flex-end"}}/>}
                                </div> 
                                <CommentLikeUnlike comment={c}/>
                            </div>)}
                            {post.comments.length === 0 && <p className="center">No comments yet</p>}
                        </div>
                        
                        <div className="modal-post-form">
                            <div className="w-100 p-10">
                                <LikeUnlike post={post}/>
                            </div>
                            <div className="w-100 p-10">
                                <small>{dayjs(post.createdAt).fromNow()}</small>
                                <form className="comment-form" onSubmit={handleSubmit}>
                                    <input placeholder="Post a comment" type="text" onChange={(e) => setBody(e.target.value)} value={body}/>
                                    <Button type="submit" content="Submit"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
    )
}
