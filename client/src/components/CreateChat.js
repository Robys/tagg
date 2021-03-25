import {useState} from 'react'
import {Button} from 'react-bootstrap'
import {FindCurrent} from '../utils/utils'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_CHAT} from '../api/mutations'
import {Redirect} from 'react-router-dom'

export default function CreateChat(props){
    const [receiver,SetReceiver] = useState()
    const [data,SetData] = useState()
    const [CreateChat] = useMutation(CREATE_CHAT)
    const current = FindCurrent()

    const StartChat = () =>{
        console.log(props)
        if(current.id === props.from){
        SetReceiver(props.receiver)
        }
        else{
            SetReceiver(props.from)
        }

        setTimeout(()=>{

            CreateChat({variables : {from:current.id,receiver} }).then(({data}) => {
                SetData(data)
            } ).catch(error => {
                console.log(error)
            })

        }, 5000)
    
    }

   // console.log(props)
    return (
    
    <div>
        <Button href="/mailbox" onClick={e => {
            e.preventDefault()
            StartChat()
        }}>Enviar Mensagem</Button>

        {data? <Redirect to="/mailbox"/> : ""}


    </div>

    )
}

/**
 * 
 *  const [receiver,SetReceiver] = useState()
    const [CreateChat] = useMutations(CREATE_CHAT)
    const current = FindCurrent()

    const StartChat = e =>{
        e.preventDefault()
        if(current.id === props.from){
        SetReceiver(props.receiver)
        }
        else{
            SetReceiver(props.from)
        }
        
        CreateChat({variables : {from:current.id, receiver:receiver} }).then(({data}) => {
            console.log(data)
        } ).catch(error => {
            console.log(error)
        })
    }

 * 
 * 
 */