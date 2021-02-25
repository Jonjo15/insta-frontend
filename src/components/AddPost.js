import React from 'react'
import {Modal, Button, Popup} from "semantic-ui-react"


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
    return (
        <>
        <Popup content='Add a new post' trigger={<Button style={{backgroundColor: "white", marginTop: 5}} icon="add" onClick={() => dispatch({ type: 'open'})} />} />
        <Modal
            size="large"
            open={open}
            onClose={() => dispatch({ type: 'close' })}
        >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Cancel
          </Button>
          <Button positive onClick={() => dispatch({ type: 'close' })}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
      </>
    )
}
