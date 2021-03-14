import React, {useState} from 'react'
import {Image} from "semantic-ui-react"
import Modal from "../Modal"
export default function PostPreview({post}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="post-preview">
            {/* TODO: Change image below this is for testing  */}
            <Modal open={open} setOpen={setOpen} post={post}/>
            <Image onClick={(e) => setOpen(true)} style={{cursor: "pointer"}} size="medium" src={post.picture} alt="post"/>
        </div>
    )
}
