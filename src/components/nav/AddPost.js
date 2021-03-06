import React, { useState } from 'react'
import { Modal, Button, Popup, Form } from "semantic-ui-react"
import { useFeed } from "../../context/feed/FeedContext"
import { useAuth } from "../../context/auth/AuthContext"

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true }
    default:
      throw new Error('Unsupported action...')
  }
}

export default function AddPost() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
  })
  const { open } = state
  const [body, setBody] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const { addPost } = useFeed()
  const { state: { currentUser } } = useAuth()
  const fileTypes = ["image/png", "image/jpeg"]

  const handleSubmit = e => {
    e.preventDefault()
    if (!file) {
      setError("You have to choose a file")
      return
    } else {
      addPost({picture: file, body: body}, currentUser)
      setError("")
      setBody("")
      setFile(null)
      dispatch({ type: "close" })

    }
  }
  const handleChange = e => {
    let file = e.target.files[0];
    if (file && fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result)
        setError("")
      };
      reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        setFile(null)
        setError('something went wrong!');
      };
    }
    else {
      setFile(null)
      setError("Choose the right file type (image/png or image/jpeg)")
    }
  }
  return (
    <>
      <Popup content='Add a new post' trigger={<Button style={{ backgroundColor: "white", marginTop: 5 }} icon="add" onClick={() => dispatch({ type: 'open' })} />} />
      <Modal
        size="large"
        open={open}
        onClose={() => {
          dispatch({ type: 'close' })
          setBody("")
          setFile("")
          // setFileName("")
        }}
      >
        <Modal.Header>Create a new post</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Select an image for your new post</label>
              <input type="file" onChange={handleChange} placeholder='New Img' />
              <input type="text" onChange={(e) => setBody(e.target.value)} value={body} placeholder="Caption (optional)" />
              {error && <p>{error}</p>}
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Cancel
          </Button>

        </Modal.Actions>
      </Modal>
    </>
  )
}
