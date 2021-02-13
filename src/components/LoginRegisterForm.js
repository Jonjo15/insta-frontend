import React, {useState} from 'react'
import { Container, Form, Button, Input } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login';

export default function LoginRegisterForm() {
    const [isLogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const handleSubmit = e => {
        e.preventDefault()
        console.log("submit  ", username, password, email)
    }
    const handleGoogle = e => {
        console.log("google")
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                {!isLogin && <Form.Field required>
                <label>Username</label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                </Form.Field>}
                <Form.Field required>
                <label>Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@email.com' />
                </Form.Field>
                <Form.Field required>
                <label>Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
            {/* <Button className="center" onClick={handleGoogle} color='google plus'>
                <Icon name='google plus' /> Sign In With Google
            </Button> */}
            <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Sign In With Google"
                onSuccess={handleGoogle}
                onFailure={handleGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <div className="m-auto">
                <span>{isLogin ? "Don't have an account? Register" : "Alredy have an account? Log In"}</span>
                <Button onClick={() => setIsLogin(c => !c)} content="Here"/>
            </div>
            
        </Container>
    )
}
