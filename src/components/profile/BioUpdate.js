import React, {useState} from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { useFeed } from '../../context/feed/FeedContext'

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

const BioUpdateForm = ({token}) => {
  const {updateBio} = useFeed()
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const [bio, setBio] = useState("")
  const { open, size } = state
  const handleSubmit = async e => {
      e.preventDefault()
      updateBio(bio)
      setBio("")
      dispatch({ type: 'close' })
  }
  return (
    <>
      <Button onClick={() => dispatch({ type: 'open', size: 'small' })}>
        Update Bio
      </Button>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Update Your Profile</Modal.Header>
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
            <label>Bio</label>
            <input onChange={(e) => setBio(e.target.value)} placeholder='Bio' value={bio} />
            {/* {error && <p>{error}</p>} */}
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

export default BioUpdateForm