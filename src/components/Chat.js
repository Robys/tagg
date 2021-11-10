import {useState,useEffect} from 'react'
import {List} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
import {CHAT} from '../api'
import Message from './Message'

/** The Chat in these application is the list of messages between
 * two users 
 * @constructor
 * @param {Object} sender - person who's send the message 
 * @param {Object} receiver - person who's received the message
 */


function Chat ({sender,receiver}){
    
    const [messages,SetMessages] = useState()

    useEffect(()=>{
        const getMessages = async () =>{
            const response = await CHAT(sender,receiver)
            SetMessages(response)
        }

        getMessages()

    },[sender,receiver])

    return(
     <List style={{maxHeight: '400px', overflow: 'auto'}}>
        {messages 
        ? messages.map(item => <Message message={item} key={item.id} id="message"/>)
            : <ul style={{listStyle:"none", marginTop:"10px"}}>
            <li style={{display:"inline-flex"}}>
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
            </li>
            <li>
                <Skeleton animation="wave" variant="rect" height={100} />
            </li>
            </ul>
        }
        </List>
    )

}

/**
 * overflow-y: scroll;
 * 
 * {messages ? 
        <List style={{margin:"10px",height:"100%"}}>
            {messages.map(item => 
                <Message item={item} key={item.id}/>
                )}
        </List>
        : 
        <ul style={{listStyle:"none", marginTop:"10px"}}>
            <li style={{display:"inline-flex"}}>
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
            </li>
            <li>
                <Skeleton animation="wave" variant="rect" height={100} />
            </li>
            </ul>
        }
 */

export default Chat