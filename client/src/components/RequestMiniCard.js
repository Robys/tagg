import {FindGame,FindUser} from '../utils/utils'
import UpdateRequest from './UpdateRequest'
import {Card} from 'react-bootstrap'

export default function RequestMiniCard (info){

   const res = Object.values(info).map(res => {
       return res
   })

   let owner = []
   let other = []
   
   const requiredGame = FindGame(res[0].required)
   const SelectedGame = FindGame(res[0].selected)

   if(requiredGame && SelectedGame){
        owner = FindUser(requiredGame.owner)
        other = FindUser(SelectedGame.owner)
   }

    return(
        <Card className="game-details" bg="dark">
            {requiredGame.cover !== undefined ? <Card.Img src={requiredGame.cover.path} alt={requiredGame.title}/> : "" }
            <Card.Body>
                {requiredGame ?
                <div>
                <Card.Header>
                    <Card.Title>{requiredGame.title}</Card.Title>
                        <p>id da troca: {res[0].id}</p>
                        <Card.Subtitle>para : {requiredGame.platform}</Card.Subtitle>
                        </Card.Header>
                        {owner!==null
                        ?
                        <Card.Header>
                        <Card.Text> quem pediu : <a href={`/profile/${owner.id}`}> {owner.firstName} {owner.lastName} </a></Card.Text>
                        <Card.Text>{owner.email}</Card.Text>
                    
                        <Card.Text>pedido feito : {res[0].createdAt}</Card.Text>
                        {res[0].accepted === true ?
                         <p style={{color:"green"}}>aceita</p>
                         : <p style={{color:"red"}}>negada/pendente</p>
                         }

                         
                {(other && owner) !== null? 
                <UpdateRequest id={res[0].id} from={owner.id} receiver={other.id} status={res[0].accepted} madeBy={res[0].madeBy}/>
                :""}

                        </Card.Header>
                        : <p>informações não encontradas</p> }
                        

                </div>

                : <Card.Header>
                    <Card.Title>O anuncincio não encontrado ou  excuído</Card.Title>
                </Card.Header>}

                {other!==null? 
                        <Card.Header>
                        <Card.Title>Trocando por: {SelectedGame.title}</Card.Title>
                        <Card.Subtitle>para : {SelectedGame.platform}</Card.Subtitle>

                        {other
                        ? 
                        <div>

                            <p>pertence a: <a href={`/profile/${other.id}`}> {other.firstName} </a></p>
                            <p> {other.email} </p>
                            <a href={`/details/${SelectedGame.id}`}>ir para detalhes</a>
                        </div>

                        : <p>O usuário dono deste game não foi encontrado, ou a conta não existe mais.</p>  
                         }
                </Card.Header>
                : <p>informações não encontradas</p>}

                        
            
            </Card.Body>

            
            </Card>
    )
}