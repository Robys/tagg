import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import {LOGIN} from '../api/mutations'
import {CURRENT_USER} from '../api/queries'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import FacebookButton from './FacebookButton'

const Login = () => {

    const [email,SetEmail] = useState()
    const [password,SetPassword] = useState()
    const [ready,SetReady] = useState(false)
    const [error,SetError] = useState()
    const [show, setShow] = useState(true);


    const [login] = useMutation(LOGIN,{
        update:(cache, { data: { login }}) => cache.writeQuery({
            query:CURRENT_USER,
            data:{me:{email:login.email,password:login.password}}
        })
    })


    return(
        <Card className="login-card">

            {error
            ? <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Aviso</Alert.Heading>
                {error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
                ))}
            </Alert> 
            : ""}

            <Form 
            onSubmit={e =>{
                e.preventDefault()
                login({ variables: {email,password} }).then(({ data }) => {
                    SetReady(true)
                  })
                  .catch(error => {
                    SetError(error)
                  })
            } }>
            <h2>Login</h2>
            
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={e=> SetEmail(e.target.value)}/>
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" onChange={e=> SetPassword(e.target.value)}/>

            <Button style={{marginRight:"10px"}}
            type="submit">
            Entrar
            </Button>
            <FacebookButton/>

            {ready
            ? <Redirect to="/dashboard"/> 
            : ""}
            
            </Form>

        </Card>
    )
    
}

export default Login

/*


*/