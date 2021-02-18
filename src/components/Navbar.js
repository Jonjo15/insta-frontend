import React from 'react'
import {Link} from "react-router-dom"
import {Container, Menu} from "semantic-ui-react"
import NavUserDropdown from './NavUserDropdown'
import Notifications from "./Notifications"
import Requests from './Requests'


export default function Navbar() {
    return (
        <Container>
          <Menu>
            <Menu.Item
            name='home'
            as={Link}
            to="/"
            />
            <Menu.Menu position="right">
                <Requests />
                <Notifications />
                <NavUserDropdown />
            </Menu.Menu>
            
        </Menu>
        </Container>
    )
}
