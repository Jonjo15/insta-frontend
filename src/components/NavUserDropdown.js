import React from 'react'
import {Dropdown, Button} from "semantic-ui-react"
import {Link} from "react-router-dom"
import { useAuth } from '../context/auth/AuthContext'
export default function NavUserDropdown() {
    const {logout, state: {currentUser}} = useAuth()
    const handleLogout = e => {
        console.log("logging out")
        logout()
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
