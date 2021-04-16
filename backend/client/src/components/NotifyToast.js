/**
 * Notificação (recado de canto de tela) 
 */

import {useMutation} from '@apollo/react-hooks'
import {UPDATE_NOTIFY,DELETE_NOTIFY} from '../api/mutations'
import {Toast,Image} from 'react-bootstrap'
import {FindUser} from '../utils/utils'

export default function NotifyToast (props){
    const [updateNotify] = useMutation(UPDATE_NOTIFY, { variables : {_id: props.item.id} })
    const [deleteNotify] = useMutation(DELETE_NOTIFY, { variables : {_id: props.item.id} })
    
    const sender = FindUser(props.item.from)
    return(
        <Toast className="notify-toast"
        key={props.item.id} show={props.enabled} onClose={()=>deleteNotify()}>
           {sender!==null ?  <Toast.Header>
                <Image 
                roundedCircle src={sender.picture} alt={sender.firstName} /> 
                de: 
                <a href={`/profile/${sender.id}`}>
                {sender.firstName} {sender.lastName}
                </a>
                </Toast.Header> : <Toast.Header>usuário não identificado</Toast.Header>}
            <Toast.Body>
                <p>
                {props.item.content}
                </p>
                {props.item.accepted===false?
                <a href="/dashboard" onClick={()=>updateNotify()}>marcar como lida</a>
                :""}
            </Toast.Body>
        </Toast>


    )
}

/**
 * 
 * 
 * onClose={e => deleteNotify({variables:{_id:item.id}}) }
 */
