import {Card,Image} from 'react-bootstrap'
import {FindUser} from '../utils/utils'

export default function ChatBallon({_id,content}){
    const user = FindUser(_id)

    return(
        <Card style={{maxWidth:"320px",margin:"20px" }}>
            <Card.Header>
                <Image src={user.picture} alt={user.firstName} 
                style={{height:"40px",width:"40px", marginRight:"10px"}}/> 
                {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
            </Card.Body>

        </Card>
    )
}