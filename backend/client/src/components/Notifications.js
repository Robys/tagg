/**
 * Script chamado quando existe 
 * uma nova notificação adicionada 
 * (retirado do projeto por enquanto)
 */

import {useState} from 'react'
import {useSubscription} from '@apollo/react-hooks'
import {NOTIFY_ADDED} from '../api/subscriptions'
import {Toast} from 'react-bootstrap'

export default function Notifications(){
    const [show, setShow] = useState(false);
    
    const {data,error} = useSubscription(NOTIFY_ADDED)

    return(
        <div>
            {error ? console.log(error) : ""}
            {!data === undefined ? 
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header> Aviso </Toast.Header>
            </Toast>
            : ""}
   
        </div>
    )
}
