import {createRef,useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {UPDATE_GAME,DELETE_GAME} from '../../api/mutations'
import {Table,Button,Modal,Form,Row,Col} from 'react-bootstrap'
//import Paginate from '../../components/Paginate'
import {ExportGamesPDF} from '../components/ExportPDF'

export default function GamesTable(props){
    const ref = createRef()
    const [gameId,setGameId] = useState()
    const [title,setTitle] = useState('')
    const [location,setLocal] = useState(undefined)
    const [description,setDescription] = useState(undefined)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [updateGame] = useMutation(UPDATE_GAME)
    const [deleteGame] = useMutation(DELETE_GAME)
    
    return(<div>

        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Informações do Jogo</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                        <Form.Control placeholder="novo titulo" onChange={e=> setTitle(e.target.value)}/>
                            </Col>
                            <Col>
                        <Form.Control placeholder="nova localização" onChange={e=> setLocal(e.target.value)}/>
                            </Col>
                        </Row>
                        <Form.Control as="textarea" rows={3} 
                        onChange={e=> setDescription(e.target.value)}
                        placeholder="nova descrição" 
                        style={{marginBottom:"10px"}}/>
                        <Button>Remover Foto</Button>
                    </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger"
                        onClick={e=>{
                            deleteGame({variables:{_id:gameId}})
                        }}>
                                Excluir Jogo
                        </Button>
                            <Button variant="success" 
                            onClick={e=>{
                                e.preventDefault()
                                console.log(title,location,description)
                                updateGame({variables: 
                                    {_id:gameId,title:title,location:location,description:description}})
                                }}>
                                Salvar
                            </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                 </Modal.Footer>
            </Modal>

        <Table striped bordered hover ref={ref}>
                <thead>
                        <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Plataforma</th>
                        <th>Local</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.list
                        ? props.list.games.map(res =>
                            <tr key={res.id}>
                                <td onClick={e=>{
                                    setGameId(res.id)
                                    setShow(true)
                                    }}>{res.id}</td>
                                <td>
                                    <a href={`/details/${res.id}`}>{res.title}</a>
                                </td>
                                <td>{res.platform}</td>
                                <td>{res.location}</td>
                                <td>{res.status}</td>
                            </tr>
                        )
                        :""}
                    </tbody>

        </Table>

        <Button onClick={e => {
                    e.preventDefault()
                    ExportGamesPDF(props.list.games)
        }}>Exportar PDF</Button>
            
                
        </div>
        
    )
}

/*<tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.title}</td>
                                <td>{game.platform}</td>
                                <td>{game.location}</td>
                                <td>{game.status}</td>
                            </tr> */