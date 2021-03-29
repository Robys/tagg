import {FindGame} from '../utils/utils'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import {Card,Form,Button,Row,InputGroup} from 'react-bootstrap'
import {publishers} from '../utils/utils'
import TopBar from '../utils/TopBar'

export default function GameSettings(props){
    const game = FindGame(props.match.params.id)
    const gameId = game.id
    const [title,SetTitle] = useState()
    const [publisher,SetPublisher] = useState()
    const [platform,SetPlatform] = useState()
    const [status,SetStatus] = useState()
    const [cover,SetPicture] = useState()
    const [value,SetValue] = useState()
    const [description,SetDesc] = useState()

    const [ready,SetReady] = useState(false)

    const convertFile = e =>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (){
            var b64 = reader.result
            SetPicture(b64)
        }
    }

    return (
        <div>
            <TopBar/>

            <Card className="game-details">
            {game!==undefined?
            <div>
                {game.cover !==undefined ?
                <div> 

                    <Card.Img src={game.cover.path} alt={game.title}/>
                    <Form.File id="myfile"
                    label="Trocar Foto"
                    lang="pt"
                    style={{width:"200px",fontSize:"smaller"}}
                    onChange={convertFile}
                    /> 

                </div>
                :""}
            </div> 
            : "" }

            <Card.Body>
                <Form  style={{padding:"20px"}}>
                    <h2>Alterar Informações do Jogo </h2>
                <InputGroup size="sm" style={{marginBottom:"10px"}}>
                <Form.Control  placeholder="titulo do jogo" onChange={e => SetTitle(e.target.value)}/>
                <Form.Control as="select" onChange={e => SetPublisher(e.currentTarget.value)}>
                    <option>Publicadora</option>
                    {publishers.map(p => 
                    <option value={p.name} key={p.name}>
                        {p.name}
                    </option>)}

                </Form.Control>
                
                </InputGroup>

                <InputGroup size="sm" style={{marginBottom:"10px"}}>
                <Form.Control as="select"onChange={e => SetPlatform(e.currentTarget.value)}>
                    <option>plataforma</option>
                    <option value="Playstation">Playstation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="PC">PC</option>
                    <option value="Other">Outro</option>
                </Form.Control>

                <Form.Control as="select" onChange={e => SetStatus(e.currentTarget.value)}>
                    <option>estado</option>
                    <option value="Lacrado">Lacrado</option>
                    <option value="Novo">Novo</option>
                    <option value="Usado">Usado</option>
                    <option value="Danificado">Danificado</option>
                    <option value="Other">Outro</option>
                </Form.Control>
                
                </InputGroup>

                </Form>

                <Card  bg="dark">
                <Card.Header>
                <Form.Label>Alterar Descrição e valor </Form.Label>
                    </Card.Header>
                <Card.Body>

                <Row> 
                <Form.Control placeholder="value" onChange={e=> SetValue(e.target.value)} style={{marginBottom:"10px"}} />
                <Form.Control as="textarea" placeholder="descrição" onChange={e=> SetDesc(e.target.value)} rows="3" />
                </Row>
                
                </Card.Body>
                <Card.Footer>
                <Button onClick={e=>{
                    e.preventDefault()
                    SetReady(true)
                }}>Enviar</Button> 

                </Card.Footer>

                </Card>

            </Card.Body>
            {ready? <Redirect to={{
                pathname:"/processgame",
                state: {
                    gameId,
                    title,
                    publisher,
                    platform,
                    status,
                    value,
                    description,
                    cover}

            }}/> : ""}

            </Card>

        </div>
    )
}

/**
 * {ready?  : ""}
 */