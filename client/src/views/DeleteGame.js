import {useState} from 'react'
import {Button, Jumbotron,Spinner} from 'react-bootstrap'
import {FindGame} from '../utils/utils'
import {useMutation} from '@apollo/react-hooks'
import {DELETE_GAME} from '../api/mutations'
import TopBar from '../utils/TopBar'

export default function DeleteGame(props){
    const game = FindGame(props.match.params.id);
    const [deleteGame, {loading,error}] = useMutation(DELETE_GAME,{variables:{ _id:game.id} })
    const [data,setData] = useState()

    const ConfirmDelete = e =>{
        e.preventDefault()
        deleteGame().then(res => setData(res))
    }
    
    return(
        <div>
            <TopBar/>

            <Jumbotron>
               {!data? <div>
                   <h2>Cuidado!</h2>
                   <p> Deseja mesmo prosseguir excluindo permanentemente {game.title} da sua coleção?  </p>
               </div>  
                : 
                <div>
                    <h2>Tudo Ok</h2>
                    <p>{game.title} já foi exluído</p>

                </div>
               }

                {error? <p>{JSON.stringify(error)}</p>: ""}
                
                {data? <Button href="/dashboard" variant="success">Voltar ao início</Button> : 
                <Button onClick={e => ConfirmDelete(e)} variant="danger">
                {loading? <Spinner/>: "Confirmar exclusão"}
                </Button> }

            </Jumbotron>
        
        </div>
    )

}

/*







*/