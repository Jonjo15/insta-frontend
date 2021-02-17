import React from 'react'
import {Link} from "react-router-dom"
import {Container, Menu, Dropdown, Button} from "semantic-ui-react"
import { useAuth } from '../context/auth/AuthContext'
import Notifications from "./Notifications"

const requestText = (username) => {
    return username + " wants to follow you"
}
export default function Navbar() {
    const {logout, state: {currentUser}} = useAuth()
    const handleLogout = e => {
        console.log("logging out")
        logout()
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
                        {currentUser?.follow_requests?.length === 0 && <Dropdown.Item text="You have no follow requests"/>}
                        {currentUser?.follow_requests.map(f => <Dropdown.Item as={Link} to={"/users/" + f._id} text={requestText(f.username)} />)}
                    </Dropdown.Menu>
                </Dropdown>
                
                {/* <Menu.Item
                    name="Notifications"
                    as={Notifications}
                 /> */}
                <Notifications />
                
                <Dropdown icon="user">
                    <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Profile" as={Link} to="/profile"/>
                        <Dropdown.Item icon="sign-out" text="Logout" as={Button} onClick={handleLogout}/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
            
        </Menu>
        </Container>
    )
}
