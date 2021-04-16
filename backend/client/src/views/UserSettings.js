/**
 * Tela de edição das informações do usuário
 * **/

import {FindCurrent} from '../utils/utils'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import {Card,Form,Button,Col,Row} from 'react-bootstrap'
import TopBar from '../utils/TopBar'

export default function UserSettings(){
   // const [show, setShow] = useState(true);
    const [firstName,SetFirstName] = useState()
    const [lastName,SetLastName] = useState()
    const [email,SetEmail] = useState()
    const [picture,SetPhoto] = useState()
    const [location,SetLocation] = useState()
    const [password,SetPassword] = useState()

    const [ready,SetReady] = useState(false)

    const current = FindCurrent()

    const convertFile = e =>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (){
            var b64 = reader.result
            SetPhoto(b64)
        }
    }

    return (
        <div>
            <TopBar/>

            <Card className="game-details">
            {current.picture !== undefined ?
            <div>
                <Card.Img src={current.picture} alt={current.firstName}/>
                <Form.File id="myfile"
                label="Trocar Foto"
                lang="pt"
                style={{width:"200px",fontSize:"smaller"}}
                onChange={convertFile}
                /> 
            </div> 
            : "" }

            <Card.Body>
                <Form  style={{padding:"20px"}}>
                    <h2>Atualizar Perfil</h2>
                <Row>
                    <Col>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control onChange={e=> SetFirstName(e.target.value)} placeholder={current.firstName}/>
                    </Col>
                    <Col>
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control onChange={e=> SetLastName(e.target.value)} placeholder={current.lastName}/>
                    </Col>
                </Row>

                <Form.Label>Email</Form.Label>
                <Form.Control onChange={e=> SetEmail(e.target.value)} placeholder={current.email}/>

                <Form.Label>Você se mudou?</Form.Label>
                <Form.Control type="text" onChange={e=> SetLocation(e.target.value)} placeholder={current.location}/>

                </Form>

                <Card  bg="dark">
                <Card.Header>
                <Form.Label>Precisa mudar a senha?</Form.Label>
                <Form.Text className="text-muted">
                   Escolha senhas que possuam mais de 6 caractéres, números e letras maiúsculas.
                </Form.Text>
                    </Card.Header>
                <Card.Body>

                <Row>
                    <Col>
                    <Form.Control type="password" onChange={e=> SetPassword(e.target.value)}/>
                    </Col>
                    <Col>
                    <Button onClick={e=>{
                        e.preventDefault()
                        SetReady(true)
                    }}>Enviar</Button> 
                    </Col>
                </Row>
                
                </Card.Body>

                </Card>

            </Card.Body>
            {ready? <Redirect to={{
                pathname:"/processuser",
                state: {firstName,lastName,email,picture,location,password}

            }}/> : ""}

            </Card>

        </div>
    )
}