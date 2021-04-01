/**
 * Balão (cartão) contendo a mensagem que foi enviada
 * **/

import {Card,Image} from 'react-bootstrap'
import {FindUser} from '../utils/utils'

export default function ChatBallon({_id,content}){
    const user = FindUser(_id)

    return(
        <Card className="chat-ballom">
            <Card.Header>
                <Image  roundedCircle
                src={user.picture} alt={user.firstName} 
                style={{height:"40px",width:"40px", marginRight:"10px"}}/> 
                {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
            </Card.Body>

        </Card>
    )
}