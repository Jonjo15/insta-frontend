import React from 'react'
import LoginRegisterForm from '../components/LoginRegisterForm'
import { useAuth } from '../context/auth/AuthContext'
import {Redirect} from "react-router-dom"
export default function Auth() {
    const {state: {authenticated}} = useAuth()
    return (
        authenticated ? (<Redirect to="/" />) : (<div className="m-auto mt-100">
            <h1 className="center">Sign In</h1>
           <LoginRegisterForm />
        </div>)
        
    )
}
