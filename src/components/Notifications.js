import React from 'react'
import {Dropdown, Button } from "semantic-ui-react"
import {Link} from "react-router-dom"
import { useNotifications } from '../context/notifications/NotificationsContext'
export default function Notifications() {
    const {state: {notifications}} = useNotifications()
    const markAllRead = e => {
        console.loge("hey")
    }
    return (
        <div>
            <Dropdown text={(notifications.filter(n => n.seen === false).length).toString()} icon="alarm">
                <Dropdown.Menu>
                    {/* TODO: REFACTOR NOTIFICATIONS INTO ITS OWN COMPONENTS */}
                    {notifications?.length === 0 && <Dropdown.Item text="You have no notifications"/>}
                    {notifications?.length > 0 && notifications.map(n => <Dropdown.Item as={Link} to={"/posts/" + n.postId} key={n._id} text={n.sender.username} />)}
                    {notifications.filter(n => n.seen === false).length > 0 && <Dropdown.Item icon="trash" as={Button} text="Mark all notifications read" onClick={markAllRead}/>}
                </Dropdown.Menu>{notifications.filter(n => n.seen === false).length}
            </Dropdown>
        </div>
    )
}
