import {useState} from 'react'
import ChatScreen from '../components/ChatScreen'
import Contact from '../components/Contact'
import {FindCurrent,FindChat} from '../utils/utils'
import {Card,Spinner} from 'react-bootstrap' 
import TopBar from '../utils/TopBar'

export default function MailBox(){
    const current = FindCurrent()
    const {data,loading,error} = FindChat(current.id)
    const [currentChat,setCurrentChat] = useState()

    const contact = (currentChat) => setCurrentChat(currentChat);
    
    console.log(data)
    
    return(
        <div>
            <TopBar/>
            
            <Card className="chat-list">
                <Card.Header>contatos</Card.Header>
                <Card.Body>
                    {loading? <Spinner/> : ""}
                    {error? <p>ops, não foi possível carregar os dados</p>:""}
                    {data? Object.values(data).map(chats => 
                        chats.map(chat => <Contact key={chat.id} info={chat} contact={contact}/> )) 
                    :""}

                </Card.Body>

            </Card>

           {currentChat!==undefined
           ? <>
            <ChatScreen chatId={currentChat.id} from={currentChat.from} receiver={currentChat.receiver}/>
           </>
            : <>
            <ChatScreen/>
           </>
           }
           
         
        </div>
    )
}