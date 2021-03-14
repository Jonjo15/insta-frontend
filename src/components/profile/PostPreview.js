import React, {useState} from 'react'
import {Image} from "semantic-ui-react"
import Modal from "../Modal"
export default function PostPreview({post}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="post-preview">
            <Modal open={open} setOpen={setOpen} post={post}/>
            <Image  style={{cursor: "pointer"}} className="preview-post-image" src={post.picture} alt="post"/>
            <div onClick={(e) => setOpen(true)} className="absolute-preview"></div>
        </div>
    )
}
