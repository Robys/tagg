
import {useMutation} from '@apollo/react-hooks'
import {UPDATE_REQUEST} from '../api/mutations'
import CreateChat from './CreateChat'
import {Button,Spinner} from 'react-bootstrap'
import {FindCurrent} from '../utils/utils'

export default function UpdateRequest (props){
    
    const [updateRequest,{loading,error}] = useMutation(UPDATE_REQUEST)

    const current = FindCurrent()

        return (
            <div>
            {current.id === props.receiver
             ?  <ul style={{listStyle:"none"}}>
                <li>
                <Button variant="danger" disabled={props.accepted} onClick={e=>{
                e.preventDefault()
                updateRequest({variables: {_id:props.id,accepted:false, from:props.from, receiver:props.receiver } } )
                }}>
                    {loading? <Spinner/> : "negar"}
                </Button>
                </li>
                <li>
                <Button variant="success" disabled={props.accepted} onClick={e=>{
                e.preventDefault()
                updateRequest({variables: {_id:props.id,accepted:true, from:props.from, receiver:props.receiver }  })
                }}>
                    {loading? <Spinner/> : "aceitar"}
                </Button>
                </li>
                {props.status ?<li> <CreateChat from={props.from} receiver={props.receiver} madeby={props.madeBy} />  </li> : "" }
                </ul>
        
             : <CreateChat from={props.from} receiver={props.receiver} required={props.madeBy} madeby={props.madeBy} />}

             {error? <p>Error. </p>: ""}

             {error? <p>Error. </p>: ""}
            </div>
            
    
    )

}

/***
 {current.id === props.receiver
             ?  <ul style={{listStyle:"none"}}>
                <li>
                <Button variant="danger" disabled={props.accepted} onClick={e=>{
                e.preventDefault()
                updateRequest({variables: {_id:props.id,accepted:false, from:props.from, receiver:props.receiver } } )
                }}>
                    {loading? <Spinner/> : "negar"}
                </Button>
                </li>
                <li>
                <Button variant="success" disabled={props.accepted} onClick={e=>{
                e.preventDefault()
                updateRequest({variables: {_id:props.id,accepted:true, from:props.from, receiver:props.receiver }  })
                }}>
                    {loading? <Spinner/> : "aceitar"}
                </Button>
                </li>
                {props.status ?<li> <CreateChat from={props.from} receiver={props.receiver} madeby={props.madeBy} />  </li> : "" }
                </ul>
        
             : <CreateChat from={props.from} receiver={props.receiver} required={props.madeBy} madeby={props.madeBy} />}

             {error? <p>Error. </p>: ""}
 */