import React from 'react'
import {Dropdown, Button } from "semantic-ui-react"
import {Link} from "react-router-dom"
import { useNotifications } from '../../context/notifications/NotificationsContext'
export default function Notifications() {
    const {markNotificationsRead, state: {notifications}} = useNotifications()
    const markAllRead = e => {
        markNotificationsRead({notifications: notifications.map(n => n._id)})
    }
    return (
            <Dropdown icon="alarm" text={notifications.filter(n => n.seen === false).length > 0 ? notifications.filter(n => n.seen === false).length.toString() : ""} >
                <Dropdown.Menu>
                    {notifications?.length === 0 && <Dropdown.Item text="You have no notifications"/>}
                    {notifications?.length > 0 && notifications.map(n => <Dropdown.Item as={Link} to={getLink(n.type, n.postId, n.sender._id)} key={n._id} text={createNotificationText(n.type, n.sender.username)} />)}
                    {notifications.filter(n => n.seen === false).length > 0 && <Dropdown.Item icon="trash" as={Button} text="Mark all notifications read" onClick={markAllRead}/>}
                </Dropdown.Menu>
            </Dropdown>
    )
}
const getLink = (type, pId, uId) => {
    if (type==="like" || type ==="comment") {
        return "/posts/" + pId
    } 
    else {
        return "/users/" + uId
    }
}

const createNotificationText = (type, username) => {
    if (type==="like") {
        return username + " gave you a like."
    }
    else if (type==="comment") {
        return username + " commented on your post."
    }
    else if (type==="accept") {
        return username + " accepted your follow request."
    }
}