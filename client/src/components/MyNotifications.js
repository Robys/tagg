import {FindNotifies} from '../utils/utils'
import NotifyToast from './NotifyToast'
import {Spinner,Card} from 'react-bootstrap'

export default function MyNotifications(){
    const {data,loading,error}  = FindNotifies() 

    return(
        <Card className="notify-area">
            <Card.Header>Recados</Card.Header>
            <Card.Body>

            {loading? <Spinner/> : ""}
            {error? <p>não foi possivel carregar as mensagens</p> : ""}
            {data?
             data.notifies.length === 0 ? <p>você não possui mensagens</p>
            : data.notifies.map(item => <NotifyToast item={item}/> ) 
            : ""}

            </Card.Body>

        </Card>

    )
}

/*
 {data.notifies.length === 0
                ? <NavDropdown.Item>ops... nenhuma novidade</NavDropdown.Item>
                
                :data.notifies.map(item=> 
                    <NavDropdown.Item key={item.id}>
                        <Toast onClose={e => deleteNotify({variables:{_id:item.id}}) }>
                            <Toast.Header>de: {item.from}</Toast.Header>
                            <Toast.Body>{item.content}</Toast.Body>
                        </Toast>
                    </NavDropdown.Item>)}  */