import React from 'react'
import {Dropdown, Button} from "semantic-ui-react"
import {Link} from "react-router-dom"
import { useAuth } from '../context/auth/AuthContext'
import { useNotifications } from '../context/notifications/NotificationsContext'
import { useFeed } from '../context/feed/FeedContext'
export default function NavUserDropdown() {
    const {logout, state: {currentUser}} = useAuth()
    const {resetNotificationState} = useNotifications()
    const {resetFeedState} = useFeed()
    const handleLogout = e => {
        console.log("logging out")
        logout()
        resetNotificationState()
        resetFeedState()
    }
    return (
        <Dropdown icon="user">
                    <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Profile" as={Link} to={"/users/" + currentUser?._id}/>
                        <Dropdown.Item icon="sign-out" text="Logout" as={Button} onClick={handleLogout}/>
                    </Dropdown.Menu>
                </Dropdown>
    )
}
