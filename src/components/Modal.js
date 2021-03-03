import React from 'react'
import { Modal, Image, Card } from "semantic-ui-react"
import {Link} from "react-router-dom"
import dayjs from "dayjs"

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function PostModal({post, open, setOpen}) {
    // const [open, setOpen] = useState(false)
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
                                
                                <Card.Header style={{marginTop: 5, marginLeft: 5}}><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link></Card.Header>
                            </Card.Content>
                        </Card>
                        {/* TODO: REPLACE BELOW WITH CUSTOM HTML THIS IS GARBAGE */}
                        <Card fluid>
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
                        </Card>
                    </div>
                </div>
            </Modal>
    )
}
