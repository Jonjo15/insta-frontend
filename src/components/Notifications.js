import React from 'react'
import {Dropdown, Button } from "semantic-ui-react"
import {Link} from "react-router-dom"
import { useNotifications } from '../context/notifications/NotificationsContext'
export default function Notifications() {
    const {markNotificationsRead, state: {notifications}} = useNotifications()
    const markAllRead = e => {
        console.log("hey")
        // console.log(notifications.map(n => n._id))
        markNotificationsRead({notifications: notifications.map(n => n._id)})
    }
    return (
            <Dropdown icon="alarm" text={notifications.filter(n => n.seen === false).length > 0 ? notifications.filter(n => n.seen === false).length.toString() : ""} >
                <Dropdown.Menu>
                    {notifications?.length === 0 && <Dropdown.Item text="You have no notifications"/>}
                    {notifications?.length > 0 && notifications.map(n => <Dropdown.Item as={Link} to={"/posts/" + n.postId} key={n._id} text={n.sender.username} />)}
                    {notifications.filter(n => n.seen === false).length > 0 && <Dropdown.Item icon="trash" as={Button} text="Mark all notifications read" onClick={markAllRead}/>}
                </Dropdown.Menu>
            </Dropdown>
    )
}
