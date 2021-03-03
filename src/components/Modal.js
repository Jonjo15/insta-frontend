import React from 'react'
import {Grid, Modal, Image, Card } from "semantic-ui-react"
// import {Link} from "react-router-dom"
export default function PostModal({post, open, setOpen}) {
    // const [open, setOpen] = useState(false)
    return (
            <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            >
                <Grid>
                    <Grid.Column width={10}>
                        <Card fluid>
                            {/* TODO: CARD BELOW TO THE OTHER SIDE */}
                            {/* <Card fluid>
                                <Card.Content>
                                    <Image
                                        circular
                                        floated='left'
                                        size='mini'
                                        src={post.poster.profile_pic_url}
                                    />
                                    <Card.Header style={{marginTop: 5, marginLeft: 5}}><Link to={"/users/" + post.poster._id}>{post.poster.username}</Link></Card.Header>
                                </Card.Content>
                            </Card> */}
                            <Card fluid>
                                <Image src={post.poster.profile_pic_url} wrapped ui={false}/>
                            </Card>
                        </Card>
                    </Grid.Column>  
                    <Grid.Column width={6}>Comments</Grid.Column>
                </Grid>
            </Modal>
    )
}
