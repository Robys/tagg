/**
 * Componente responsável por organizar as notificações (caso existam)
 * e mostra-las no canto da tela
 * **/

import {FindNotifies} from '../utils/utils'
import NotifyToast from './NotifyToast'
import {Spinner,Card,Tabs,Tab,Container} from 'react-bootstrap'
import ScrollArea from '@xico2k/react-scroll-area';
export default function MyNotifications(){
    const {data,loading,error}  = FindNotifies()

    return(
        <Container>
        <Card className="notify-area">
            <Card.Header>Recados</Card.Header>
            <Card.Body>
            <Tabs defaultActiveKey="new">
                <Tab eventKey="new" title="Novos">
                    <div style={{height:"548px"}}>
                <ScrollArea height="100%">
                {data?
                data.notifies.map(item => <NotifyToast key={item.id} item={item} enabled={!item.accepted}/> )  
                : <p>você não possui mensagens</p>}
                </ScrollArea>
                    </div>
                </Tab>
                <Tab eventKey="readed" title="Lidos" >
                    <div style={{height:"548px"}}>
                <ScrollArea height="100%">
                {data?
                 data.notifies.map(item => <NotifyToast key={item.id} item={item} enabled={item.accepted}/> )
                :  <p>você não possui mensagens</p>}
                </ScrollArea>
                    </div>
                </Tab>
            </Tabs>

            </Card.Body>
            {loading? <Spinner/> : ""}
            {error? <p>error {error.message}</p>:""}

        </Card>
        </Container>

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