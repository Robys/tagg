import {FindUser,FindCurrent} from '../utils/utils'
import {Card,Image} from 'react-bootstrap'

export default function Contact ({info,contact}){
    var user = ''
    const current = FindCurrent()

    if(current.id === info.receiver){
        user = FindUser(info.from)
    }
    else{
        user = FindUser(info.receiver)
    }
    
    return (
        <Card onClick={e => {
            e.preventDefault()
            contact(info)
        }} >
            <Card.Header>
                <Image src={user.picture} alt={user.firstName} 
                style={{height:"40px",width:"40px", marginRight:"10px"}}/> 
                {user.firstName} {user.lastName}
                </Card.Header>
        </Card>
    )
} 