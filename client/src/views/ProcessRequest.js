import {useEffect,useState} from 'react'
import {FindCurrent} from '../utils/utils'
import {Button, Jumbotron,Spinner} from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_REQUEST} from '../api/mutations'

export default function ProcessRequest(props){
    const required = props.location.state.required.id
    const selected = props.location.state.selected.id
    const current = FindCurrent()
    const [CreateRequest, {loading,error}] = useMutation(CREATE_REQUEST,
        {variables:{selected:selected,required:required,_id:current.id}})
    const [data,setData] = useState()

    useEffect(()=>{
    CreateRequest().then(res => setData(res))

    },[CreateRequest])
    

    return(
        <div>

            <Jumbotron>
                <h2>Quase Lá!</h2>
                <p> O pedido de troca está sendo encaminhado </p>
                <p> em breve o dono do {required.title} poderá entrar em contado, então fique atento!</p>

                {error? <p>{JSON.stringify(error)}</p>: ""}
                {loading? <Spinner/>: ""}
                {data? <Button href="/dashboard">Voltar ao início</Button>: ""}

            </Jumbotron>
        
        </div>
    )

}