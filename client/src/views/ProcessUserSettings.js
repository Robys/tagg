import {useEffect,useState} from 'react'
import {FindCurrent} from '../utils/utils'
import {Button, Jumbotron,Spinner} from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {UPDATE_USER} from '../api/mutations'

import TopBar from '../utils/TopBar'

export default function ProcessUserSettings(props){
    const {firstName,lastName,email,picture,location,password} = props.location.state

    const current = FindCurrent()
    const [updateUser,{loading,error}] = useMutation(UPDATE_USER, 
        { variables: {_id: current.id ,firstName,lastName,email,picture,location,password} 
    })
    const [data,setData] = useState()

    useEffect(()=>{
    updateUser().then(res => setData(res))

    },[updateUser])
    

    return(
        <div>
            <TopBar/>

            <Jumbotron className="processing">
                

                {error? <p>{JSON.stringify(error)}</p>: ""}
                {loading?
                <div>
                    <h2>Processando</h2>
                    <p> Seus Dados estão sendo atualizados </p>
                    <Spinner/>
                    </div>
                 : ""}
                {data?<div>
                    <h2>Tudo Pronto</h2>
                    <p> Sua alteração foi concluída com sucesso</p>
                    
                    <Button href="/dashboard">Voltar ao início</Button>
                </div> 
                : ""}

            </Jumbotron>
        
        </div>
    )

}