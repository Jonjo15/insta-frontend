import React from 'react'
import {Dropdown} from "semantic-ui-react"
import { useAuth } from '../../context/auth/AuthContext'
import SingleRequest from '../util/SingleRequest'


export default function Requests() {
    const {state: {currentUser}} = useAuth()
    return (
        <Dropdown icon="like">
            <Dropdown.Menu>
                {currentUser?.follow_requests?.length === 0 && <Dropdown.Item text="You have no follow requests"/>}
                {currentUser?.follow_requests.map((f, i) => {
                    if (i < 5) {
                        return <Dropdown.Item key={f._id} as={SingleRequest} request={f}/>
                    }
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}
