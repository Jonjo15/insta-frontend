import React from 'react'
import {Link} from "react-router-dom"
import {Container, Menu, Dropdown, Button} from "semantic-ui-react"
import { useAuth } from '../context/auth/AuthContext'
export default function Navbar() {
    const {logout} = useAuth()
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
                        <Dropdown.Item text="View all friend requests" as={Link} to="/requests"/>
                        <Dropdown.Item text="You have no follow requests"/>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown icon="alarm">
                    <Dropdown.Menu>
                        <Dropdown.Item text="You have no notifications"/>
                    </Dropdown.Menu>
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
