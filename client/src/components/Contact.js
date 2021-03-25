import {FindUser,FindCurrent} from '../utils/utils'
import {Image} from 'react-bootstrap'

export default function Contact ({info,contact}){
    var user = ''
    const current = FindCurrent()

    const setUser = () =>{
        
        if(current.id === info.receiver){
            user = FindUser(info.from)
        }
        else{
            user = FindUser(info.receiver)
        }
        console.log(info)

    }

    return (
        <div>
            {setUser()}
        {user!==null ? <Image rounded  src={user.picture} alt={user.firstName} 
        onClick={e => {
            e.preventDefault()
            contact(info)
        }}/> 
        :""}
        </div>
    )
} 