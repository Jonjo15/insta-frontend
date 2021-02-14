import React from 'react'
import LoginRegisterForm from '../components/LoginRegisterForm'
// import {Redirect} from "react-router-dom"
export default function Auth() {
    return (
        <div className="m-auto mt-100">
            <h1 className="center">Sign In</h1>
           <LoginRegisterForm />
        </div>
    )
}