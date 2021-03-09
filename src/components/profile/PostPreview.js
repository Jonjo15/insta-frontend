import React from 'react'
import {Image} from "semantic-ui-react"
export default function PostPreview({post}) {
    return (
        <div className="post-preview">
            {/* TODO: Change image below this is for testing  */}
            <Image size="medium" src="https://res.cloudinary.com/jonjo15/image/upload/v1612707833/jqdeohhezcby05lismmr.png" alt="post"/>
        </div>
    )
}
