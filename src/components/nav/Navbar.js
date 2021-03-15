import React from 'react'
import {Link} from "react-router-dom"
import {Container, Menu} from "semantic-ui-react"
import AddPost from './AddPost'
import NavUserDropdown from './NavUserDropdown'
import Notifications from "./Notifications"
import Requests from './Requests'
import {useAuth} from "../../context/auth/AuthContext"

export default function Navbar() {
    const {state: {authenticated}} = useAuth()
    return (
        <Container>
          <Menu >
            <Menu.Item
            icon="home"
            size="massive"
            as={Link}
            to="/"
            />
            {authenticated && (<Menu.Menu position="right">
                <AddPost />
                <Requests />
                <Notifications />
                <NavUserDropdown />
            </Menu.Menu>)}
        </Menu>
        </Container>
    )
}
