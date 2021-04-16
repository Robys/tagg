/**
 * tela de processamento (loading) dos pedidos de troca.
 * Aqui o usuário espera enquanto as informações
 * são gravadas.
 * **/


import {useEffect,useState} from 'react'
import {FindCurrent} from '../utils/utils'
import {Button, Jumbotron,Spinner} from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_REQUEST,CREATE_NOTIFY} from '../api/mutations'

import TopBar from '../utils/TopBar'

export default function ProcessRequest(props){
    const required = props.location.state.required.id
    const selected = props.location.state.selected.id
    const current = FindCurrent()
    const [CreateRequest, {loading,error}] = useMutation(CREATE_REQUEST,
        {variables:{selected:selected,required:required,_id:current.id}})
    const [data,setData] = useState()
    const [createNotify] = useMutation(CREATE_NOTIFY)
    

    const content = `você possui um pedido de troca para ${props.location.state.required.title}`
    

    useEffect(()=>{
    CreateRequest().then(res => {
        setData(res)
    })
    createNotify({
        variables: 
        {_id:current.id,
            receiver:props.location.state.required.owner,
            content:content,
            accepted:false}
    })
    
    },[CreateRequest,createNotify,content,current,props])
    

    return(
        <div>
            <TopBar/>

            <Jumbotron className="processing">
                <h2>Quase Lá!</h2>
                <p> O pedido de troca está sendo encaminhado </p>
                <p> em breve o dono do {required.title} poderá entrar em contado, então fique atento!</p>

                {error? <p>{JSON.stringify(error)}</p>: ""}
                {loading? <Spinner/>: ""}
                {data? <div>
                    <Button href="/dashboard">Voltar ao início</Button>
                </div> 
                : ""}

            </Jumbotron>
        
        </div>
    )

}