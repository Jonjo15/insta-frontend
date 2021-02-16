import React from 'react'
import {Link} from "react-router-dom"
import {Container, Menu, Dropdown, Button, Label, Icon} from "semantic-ui-react"
import { useAuth } from '../context/auth/AuthContext'
import { useNotifications } from '../context/notifications/NotificationsContext'
export default function Navbar() {
    const {logout} = useAuth()
    const {state: { notifications}} = useNotifications()
    const handleLogout = e => {
        console.log("logging out")
        logout()
    }
    const markAllRead = e => {
        //TODO:
        console.log("hey")
    }
    return (
        <Container>
          <Menu>
            <Menu.Item
            name='home'
            as={Link}
            to="/"
            />
            <Menu.Menu position="right">
                <Dropdown icon="like">
                    <Dropdown.Menu>
                        <Dropdown.Item text="View all friend requests" as={Link} to="/requests"/>
                        <Dropdown.Item text="You have no follow requests"/>
                    </Dropdown.Menu>
                </Dropdown>
                
                    <Dropdown icon="alarm">
                        <Dropdown.Menu>
                            {/* TODO: REFACTOR NOTIFICATIONS INTO ITS OWN COMPONENTS */}
                            {notifications?.length === 0 && <Dropdown.Item text="You have no notifications"/>}
                            {notifications?.length > 0 && notifications.map(n => <Dropdown.Item as={Link} to={"/posts/" + n.postId} key={n._id} text={n.sender.username} />)}
                            {notifications.filter(n => n.seen === false).length > 0 && <Dropdown.Item icon="trash" as={Button} text="Mark all notifications read" onClick={markAllRead}/>}
                        </Dropdown.Menu>{notifications.filter(n => n.seen === false).length}
                    </Dropdown>
                
                <Dropdown icon="user">
                    <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Profile" as={Link} to="/requests"/>
                        <Dropdown.Item icon="sign-out" text="Logout" as={Button} onClick={handleLogout}/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
            
        </Menu>
        </Container>
    )
}
