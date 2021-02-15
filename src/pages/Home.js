import React from 'react'
import { Container } from "semantic-ui-react"
import {Redirect} from "react-router-dom"
import { useAuth } from '../context/auth/AuthContext'
export default function Home() {
    const {state: {authenticated, currentUser}} = useAuth()
    
    return (
        authenticated ? (<Container className="mt-50">
            <h1 className="center">Home </h1>
            {currentUser && <p>Hello {currentUser.username}</p>}
        </Container>) : <Redirect to="/auth"/>
        
    )
}
