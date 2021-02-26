import React, {useState} from 'react'
import {Modal, Button, Popup, Form} from "semantic-ui-react"


function exampleReducer(state, action) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true}
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
    const [file, setFile] = useState("")
    const [fileName, setFileName] = useState("")
    const [error, setError] = useState("")

    const fileTypes = ["image/png", "image/jpeg"]

    const handleSubmit = e => {
        e.preventDefault()
        console.log("submit", file, body)
        dispatch({type: "close"})
    }
    //TODO: FINISH IMAGE UPLOAD
    const handleChange = e => {
      let file = e.target.files[0];
      console.log(e.target.value)
      if (file && fileTypes.includes(file.type)) {
          setFile(file)
          setFileName(e.target.value)
          setError("")
      }
      else {
          setFile("")
          setFileName("")
          setError("Choose the right file type (image/png or image/jpeg)")
      }
    }
    return (
        <>
        <Popup content='Add a new post' trigger={<Button style={{backgroundColor: "white", marginTop: 5}} icon="add" onClick={() => dispatch({ type: 'open'})} />} />
        <Modal
            size="large"
            open={open}
            onClose={() => dispatch({ type: 'close' })}
        >
        <Modal.Header>Create a new post</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
                    <Form.Field>
                    <label>Select an image for your new post</label>
                    <input type="file" onChange={handleChange} value={fileName} placeholder='New Img' />
                    <input type="text" onChange={(e) => setBody(e.target.value)} value={body}/>
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
