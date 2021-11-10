import { useState,useEffect} from "react"
import TopBar from "../components/TopBar"
import {GETUSERBYID} from '../api'
import { useAppContext } from '../utils/UserContext'
import {Card,CardHeader,Avatar,CardContent} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
import MessageInputBox from "../components/MessageInputBox"
import Chat from '../components/Chat'

/** This is screen provide the chat function to the user
 * 
 * @param {*} props - receiving the id from the selected contact
 */


const Messages = (props) =>{
    const contactID = props.match.params.id
    const [contact,SetContact] = useState()
    const {user} = useAppContext()
    
    useEffect(()=>{
        const getContact = async () =>{
            const response = await GETUSERBYID(contactID)
            SetContact(response) 
        }
        getContact()
        
    },[contactID])

    return <div>
        <TopBar user={user}/>
        <Card className="message-box">
        <CardHeader 
            avatar={contact ? <Avatar area-label="owner-photo" src={contact.picture}/>
                    : <Skeleton animation="wave" variant="circle" width={40} height={40} />}
            title={contact ? <a href={`/profile/${contact.id}`}> {contact.firstName} {contact.lastName} </a>
                    : <Skeleton animation="wave" height={10} width="80%"/> } />

        <CardContent>
            <Chat receiver={contact} sender={user}/>
        </CardContent>


        <MessageInputBox receiver={contact} sender={user}/>
        </Card>
        
        </div>
}



export default Messages