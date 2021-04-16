/**
 * Tela de Chat, este componente separa quem é
 * o emissor e o receptor das mensagens, e 
 * também organiza as mensagens.
 * **/


import {Card} from 'react-bootstrap'
import ChatBox from './ChatBox'
import ChatBallon from './ChatBallon'
import {FindUser,FindCurrent} from '../utils/utils'
import {useQuery} from '@apollo/react-hooks'
import {MESSAGES} from '../api/queries'
import ScrollArea from '@xico2k/react-scroll-area';

export default function ChatScreen ({chatId,from,receiver}){
    const {data} = useQuery(MESSAGES, {variables: {_id:chatId} })
    
    const current = FindCurrent()
    var user = ''
    
    //verifica quem é quem na conversa
    if(current.id === receiver){
        user = FindUser(from)
       
    }
    else{
        user = FindUser(receiver)
        
    }


    return (
        <Card className="chat-screen">
            {user!== null 
            ?<Card.Header>{user.firstName} {user.lastName}</Card.Header> 
            : <Card.Header>Selecione um contato</Card.Header> }
            <Card.Body style={{height:"348px"}}>
                <ScrollArea height="100%">

                    {data? Object.values(data).map(itens =>
                    <div key={itens.id}>
                        {itens.map(message =>  
                    <div key={message.id}>
                        {current.id === message.receiver
                        ? <ChatBallon _id={message.from} content={message.content}/>:
                        <ChatBallon _id={current.id} content={message.content}/>}
                    </div> )}

                    </div>
                    
                    ) : ""}

                </ScrollArea>


            </Card.Body>

            <ChatBox chatId={chatId} receiver={user} current={current}/>

        </Card>
            
    )


}

/***
 * 
 * 
 * 
 * 
 * 
 */