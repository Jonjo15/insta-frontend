import React, {useEffect} from 'react'
import {useParams} from "react-router-dom" 
import { useAuth } from '../../context/auth/AuthContext'
export default function ProfileHeader() {
    // MOVE THIS BELOW LOGIC TO PARENT COMPONENT
    const params = useParams()
    const {state: {currentUser}} = useAuth()
    useEffect(() => {
        document.title = params.userId === currentUser._id ? "You" : "Profile"
    }, [currentUser._id, params.userId])
    return (
        <div className="container profile-header">
            <p>{params.userId}</p>
        </div>
    )
}
