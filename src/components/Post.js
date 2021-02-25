import React from 'react'
import {Card, Image } from "semantic-ui-react"
import {Link} from "react-router-dom"
import LikeUnlike from "./LikeUnlike"
import dayjs from "dayjs"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function Post({post}) {
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
            <Image src={post.poster.profile_pic_url} wrapped ui={false} />
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
            {/* <a>
                <Icon name='user' />
                22 Friends
            </a> */}
            </Card.Content>
        </Card>
    )
}
