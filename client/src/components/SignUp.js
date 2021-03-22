import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {Redirect,Link} from 'react-router-dom'
import {SIGNUP} from '../api/mutations'
import {useState} from 'react'
import FacebookButton from './FacebookButton'
import {Form,Col,Row,Button,Card,Alert} from 'react-bootstrap'


const  SignUp = ()=>{
    const [show, setShow] = useState(true);
    const [error,SetError] = useState()
    const [ready,SetReady] = useState(false)

    const [firstName,SetFirstName] = useState()
    const [lastName,SetLastName] = useState()
    const [email,SetEmail] = useState()
    const [password,SetPassword] = useState()
    const [picture,SetPhoto] = useState()
    const [location,SetLocation] = useState()
    const [signup] = useMutation(SIGNUP)

    const convertFile = e =>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (){
            var b64 = reader.result
            SetPhoto(b64)
        }
    }

    return(
        <div>

        <Card className="sign-card">
                <Form 
            onSubmit={e=>{
                e.preventDefault()

                signup({ variables: {firstName,lastName,email,picture,location,password} }).then(({ data }) => {
                    SetReady(true)
                  })
                  .catch(error => {
                    SetError(error)
                  })
            }}>
                <h2>SignUp</h2>

                {error
                ? <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Aviso</Alert.Heading>
                {error.message}
                </Alert> 
                : ""}

                <p>Já possui uma conta? <Link to="/login"> click aqui</Link> </p>

                <Row>
                    <Col>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control size="sm" onChange={e=> SetFirstName(e.target.value)}/>
                    </Col>
                    <Col>
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control size="sm" onChange={e=> SetLastName(e.target.value)}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control size="sm" type="text" onChange={e=> SetLocation(e.target.value)}/>
                    </Col>
                </Row>

                <Form.Label>Email</Form.Label>
                <Form.Control size="sm" onChange={e=> SetEmail(e.target.value)}/>
                <Form.Label>Senha</Form.Label>
                <Form.Control size="sm" type="password" onChange={e=> SetPassword(e.target.value)}/>

                <Form.Label>Foto de Perfil</Form.Label>

                <Form.File id="myfile" onChange={convertFile}/>
                
                <Button type="submit">
                    Entrar
                </Button>

                {ready
                ? <Redirect to="/login"/> 
                : ""}

                <FacebookButton/>
          
            </Form>
            
        </Card>


        </div>
    )
    
}

export default SignUp