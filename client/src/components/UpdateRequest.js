/**
 * Função responsável por atualizar a requisição de troca
 * Também apresenta a possibilidade de adicionar outro usuário aos contatos
 * **/
import {useMutation} from '@apollo/react-hooks'
import {UPDATE_REQUEST,CREATE_NOTIFY} from '../api/mutations'
import AddContact from './AddContact'
import Report from './Report'
import {Button,Spinner} from 'react-bootstrap'
import {FindCurrent} from '../utils/utils'

export default function UpdateRequest (props){
    const [updateRequest,{loading,error}] = useMutation(UPDATE_REQUEST)
    const [createNotify] = useMutation(CREATE_NOTIFY)

    const current = FindCurrent()

        return (
            <div className="update-request">
            {current.id === props.receiver
             ?  <ul className="update-request">
                 <li>
                     <Report/>
                 </li>
                <li>
                <Button variant="danger" disabled={props.accepted} onClick={e=>{
                e.preventDefault()
                updateRequest({variables: {_id:props.id,accepted:false, from:props.from, receiver:props.receiver } } )
                const content = `Infelizmente você possui uma troca negada :(`
                createNotify({
                    variables: 
                    {_id:current.id,
                        receiver:props.from,
                        content:content,
                        accepted:false}
                })
                }}>
                    {loading? <Spinner/> : "negar"}
                </Button>
                </li>
                <li>
                <Button variant="success" disabled={props.accepted} onClick={e=>{
                e.preventDefault()
                updateRequest({variables: {_id:props.id,accepted:true, from:props.from, receiver:props.receiver }  })
                const content = `Você possui uma troca aceita!`
                createNotify({
                    variables: 
                    {_id:current.id,
                        receiver:props.from,
                        content:content,
                        accepted:false}
                })
                }}>
                    {loading? <Spinner/> : "aceitar"}
                </Button>
                </li>
                {props.status ?<li> <AddContact from={props.from} receiver={props.receiver} madeby={props.madeBy} />  </li> : "" }
                </ul>
        
             : <AddContact from={props.from} receiver={props.receiver} required={props.madeBy} madeby={props.madeBy} />}

             {error? <p>Error. </p>: ""}

             {error? <p>Error. </p>: ""}

             {props.status === false ? "caso tenha negado a troca, ainda é possivel aceita-lá depois caso mude de idéia"
             : "você aceitou esta troca"}
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