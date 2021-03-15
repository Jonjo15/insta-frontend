import React from 'react'
import {Link} from "react-router-dom"
import {Container, Menu} from "semantic-ui-react"
import AddPost from './AddPost'
import NavUserDropdown from './NavUserDropdown'
import Notifications from "./Notifications"
import Requests from './Requests'


export default function Navbar() {
    return (
        <Container>
          <Menu >
            <Menu.Item
            icon="home"
            size="massive"
            as={Link}
            to="/"
            />
            <Menu.Menu position="right">
                <AddPost />
                <Requests />
                <Notifications />
                <NavUserDropdown />
            </Menu.Menu>
            
        </Menu>
        </Container>
    )
}
