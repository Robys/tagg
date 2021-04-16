import React from 'react'
import {Redirect} from 'react-router-dom'
import {Card,Spinner} from 'react-bootstrap'
import {FindCurrent,FindContact} from '../utils/utils'
import Contact from '../components/Contact'
import ScrollArea from '@xico2k/react-scroll-area';
import {useState} from 'react'
import TopBar from '../utils/TopBar'

export default function Contacts (){
    const current = FindCurrent()
    const {data,loading,error} = FindContact(current.id)
    const [currentChat,setCurrentChat] = useState() // <- seleciona o chat com as mensagens que serão exibidas na próxima tela

    const contact = (currentChat) => setCurrentChat(currentChat);
    

    return (
        <div>
        <TopBar/>

        <Card className="chat-list">
                <Card.Header>Contatos</Card.Header>
                <Card.Body style={{height:"548px"}}>
                    {loading? <Spinner/> : ""}
                    {error? <p>ops, não foi possível carregar os dados</p>:""}
                        <ScrollArea height="100%">
                        {data? Object.values(data).map(chats => 
                            chats.map(chat =>
                                <Contact key={chat.id} info={chat} contact={contact}/> 
                            )) 
                        :""}
                        </ScrollArea>
                </Card.Body>

        </Card>
        {currentChat ? <Redirect to={{
            pathname:"/mailbox",
            state:{chat:currentChat}
        }}/> :""}
        </div>
    )
}