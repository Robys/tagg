import {useMutation} from '@apollo/react-hooks'
import {DELETE_NOTIFY} from '../api/mutations'
import {Toast,Image} from 'react-bootstrap'
import {FindUser} from '../utils/utils'

export default function NotifyToast (props){
    const sender = FindUser(props.item.from)
    const [deleteNotify] = useMutation(DELETE_NOTIFY, { variables : {_id: props.item.id} })

    return(
        <Toast key={props.item.id} >
            <Toast.Header onClose={deleteNotify()}>
                <Image src={sender.picture} alt={sender.firstName} 
                style={{height:"20px",width:"20px", marginRight:"5px"}}/>
                de: 
                <a href={`/profile/${sender.id}`}>
                {sender.firstName} {sender.lastName}
                </a>
                </Toast.Header>
            <Toast.Body>{props.item.content}</Toast.Body>
        </Toast>

    )
}

/**
 * 
 * 
 * onClose={e => deleteNotify({variables:{_id:item.id}}) }
 */
