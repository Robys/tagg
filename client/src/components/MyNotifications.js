import {FindNotifies} from '../utils/utils'
import NotifyToast from './NotifyToast'
import {Spinner,Card,Tabs,Tab} from 'react-bootstrap'

export default function MyNotifications(){
    const {data,loading,error}  = FindNotifies()
    console.log(data) 

    return(
        <Card className="notify-area">
            <Card.Header>Recados</Card.Header>
            <Card.Body>
            <Tabs defaultActiveKey="new">
                <Tab eventKey="new" title="Novos">
                {data?
                data.notifies.map(item => <NotifyToast item={item} enabled={!item.accepted}/> )  
                : <p>você não possui mensagens</p>}
                </Tab>
                <Tab eventKey="readed" title="Lidos">
                {data?
                 data.notifies.map(item => <NotifyToast item={item} enabled={item.accepted}/> )
                :  <p>você não possui mensagens</p>}
                </Tab>
            </Tabs>

            </Card.Body>
            {loading? <Spinner/> : ""}
            {error? <p>error {error.message}</p>:""}

        </Card>

    )
}

/**
 * 
 * {data?
             data.notifies.length === 0 ? <p>você não possui mensagens</p>
            : data.notifies.map(item => <NotifyToast item={item}/> ) 
            : ""}
 */

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