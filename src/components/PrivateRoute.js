import React from 'react'
import {Route} from "react-router-dom"
// import { useAuth } from '../context/authContext'
export default function PrivateRoute({ component: Component, ...rest }) {
    //TODO: GET USER FROM AUTH PROVIDDER
    // const {state: {currentUser}} = useAuth()
    return (
        <Route
        {...rest}
        render={props => {
            // return currentUser ? <Component {...props} /> : <Redirect to="/" />
        }}
    ></Route>
    )
}