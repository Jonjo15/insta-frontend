import React, {useState} from 'react'
import { Container, Form, Button, Input } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login';
import { useAuth } from '../context/auth/AuthContext';
// import {useHistory} from "react-router-dom"
export default function LoginRegisterForm() {
    const {login,clearErrors, register, googleSignIn, state: {error}} = useAuth()
    const [isLogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const handleSubmit = async e => {
        e.preventDefault()
        if(isLogin) {
            login({email, password})
        } else {
            register({username, email , password})  
        }
    }
    const handleGoogle = async response => {
        console.log(response.accessToken)
        await googleSignIn({access_token: response.accessToken})
    }
    return (
        <Container>
            {error && <p>{error}</p>}
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
                clientId="475278432981-mgmm2m3plbfcr09htfdjnvd0ha1ik99j.apps.googleusercontent.com"
                buttonText="Sign In With Google"
                onSuccess={handleGoogle}
                onFailure={handleGoogle}
            />
            <div className="m-auto">
                <span>{isLogin ? "Don't have an account? Register" : "Alredy have an account? Log In"}</span>
                <Button onClick={() => {
                    clearErrors()
                    setIsLogin(c => !c)
                    }} content="Here"/>
            </div>
            
        </Container>
    )
}
