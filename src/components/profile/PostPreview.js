import React, {useState} from 'react'
import {Image} from "semantic-ui-react"
import Modal from "../Modal"
export default function PostPreview({post}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="post-preview">
            {/* TODO: Change image below this is for testing  */}
            <Modal open={open} setOpen={setOpen} post={post}/>
            <Image onClick={(e) => setOpen(true)} style={{cursor: "pointer"}} size="medium" src="https://res.cloudinary.com/jonjo15/image/upload/v1612707833/jqdeohhezcby05lismmr.png" alt="post"/>
        </div>
    )
}
