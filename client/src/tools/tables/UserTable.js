import {useState,createRef} from 'react'
import {Table,
    Form,
    Button,
    Modal,
    Dropdown} 
from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {DELETE_USER,CREATE_NOTIFY} from '../../api/mutations'
import {GET_USERS} from '../../api/queries'
import {FindCurrent} from '../../utils/utils'
import PromoteUser from "../components/PromoteUser" 
import Paginate from '../../components/Paginate'
import {ExportUserPDF} from '../components/ExportPDF'


export default function UserTable(props){
    const [error,SetError] = useState()
    const [ready,SetReady] = useState(false)
    const [deleteUser] = useMutation(DELETE_USER)
    const [createNotify] = useMutation(CREATE_NOTIFY)
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const indexOfLastPage = currentPage*postPerPage;
    const indexOfFirstPage = currentPage-postPerPage;

    const current = FindCurrent()
    const ref = createRef()
    const list = Object.values(props.list.users).slice(indexOfFirstPage,indexOfLastPage)

    const size = Object.values(props.list.users).map(itens => {
        return Object.keys(itens).length
    })

    const [receiver,setReceiver] = useState('');
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const onDeleteButton = (id)=>{
        deleteUser({
            variables:{_id:id},
            optimisticResponse:true,
            update: (cache) => {
                const existingUsers = cache.readQuery({ query: GET_USERS });
                const newUsers = existingUsers.users.filter(users => (users.id !== id));
                cache.writeQuery({
                    query: GET_USERS,
                    data:newUsers
                })
            }  
        }).then(({ data }) => {
            SetReady(true)
          })
          .catch(error => {
            SetError(error)
          })

    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const onCreateNofity = () =>{
        createNotify({
            variables: {_id:current.id,receiver:receiver,content:message,accepted:false}
        })
    }

    return(<div>

            <Modal show={show} onHide={handleClose}  className="admin-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Criar Notificação</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form.Control as="textarea" rows={3} onChange={e=> setMessage(e.target.value)}/>
                    </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={e => {
                            onCreateNofity(receiver,message);
                            setShow(false)}
                            }>
                            Enviar
                        </Button>
                 </Modal.Footer>
            </Modal>

                
                <Table striped bordered hover ref={ref}>
                     <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Local</th>
                        <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list.map(user => 
                        <tr key={user.id}>
                        <td>
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundColor:"transparent",color:"black",border:"none"}}>
                            {user.id}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                            <Dropdown.Item><PromoteUser _id={user.id}/></Dropdown.Item>
                            {error? error.graphQLErrors.map(({ message }, i) => (
                                    <p style={{color:"red"}} key={i}>{message}</p>
                                    ) )

                                : ""}
                            <Dropdown.Item as="button" onClick={e => onDeleteButton(user.id) }> Deletar </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={e =>{
                                setReceiver(user.id)
                                setShow(true) 
                                }} > Notificar </Dropdown.Item> 

                            </Dropdown.Menu>
                        </Dropdown>
                            </td>
                                <td><a href={`/profile/${user.id}`}> {user.firstName} {user.lastName} </a></td>
                                <td>{user.email}</td>
                                <td>{user.location}</td>
                                <td>{user.roles}</td>
                            </tr>
                            
                    )}
                </tbody>
                
                </Table>

                <Button onClick={e => {
                    e.preventDefault()
                    ExportUserPDF(list)
                }}>Exportar PDF</Button>


                {size>10
                ?<Paginate postPerPage={postPerPage} totalPosts={size} paginate={paginate}/>
                : ""}

                

        </div>
        
    )
}