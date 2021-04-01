/**
 * tela de processamento (loading) de alterações que foram
 * feitas na tela de edição dos jogos 
 * **/

import {useEffect,useState} from 'react'
import {Button, Jumbotron,Spinner} from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {UPDATE_GAME} from '../api/mutations'

import TopBar from '../utils/TopBar'

export default function ProcessGameSettings(props){
    const {gameId,title,publisher,platform,status,value,description,cover} = props.location.state

    const [updateGame,{loading,error}] = useMutation(UPDATE_GAME, 
        { variables: {
            _id:gameId,
            title:title,
            publisher:publisher,
            platform:platform,
            status:status,
            value:value,
            description:description,
            cover:cover
        } 
    })
    const [data,setData] = useState()

    useEffect(()=>{
        updateGame().then(res => setData(res))

    },[updateGame])
    

    return(
        <div>
            <TopBar/>

            <Jumbotron className="processing">
                

                {error? <p>{JSON.stringify(error)}</p>: ""}
                {loading?
                <div>
                    <h2>Processando</h2>
                    <p> Aguarde enquanto a alteração no anuncio está sendo feita </p>
                    <Spinner/>
                    </div>
                 : ""}
                {data?
                <div>
                    <h2>Tudo Pronto</h2>
                    <p> Sua alteração foi concluída com sucesso</p>
                    
                    <Button href="/dashboard">Voltar ao início</Button>
                </div> 
                : ""}

            </Jumbotron>
        
        </div>
    )

}