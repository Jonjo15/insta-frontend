import React from 'react'
import {Route} from "react-router-dom"
import { useAuth } from '../context/auth/AuthContext'
import {Redirect} from "react-router-dom"
export default function PrivateRoute({ component: Component, ...rest }) {
    const {state: {authenticated}} = useAuth()
    return (
        <Route
        {...rest}
        render={props => {
            return authenticated ? <Component {...props} /> : <Redirect to="/auth" />
        }}
    ></Route>
    )
}