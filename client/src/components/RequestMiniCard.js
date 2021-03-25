import {FindGame,FindUser,FindCurrent} from '../utils/utils'
import UpdateRequest from './UpdateRequest'
import {Card} from 'react-bootstrap'

export default function RequestMiniCard (info){

   const res = Object.values(info).map(res => {
       return res
   })

   const current = FindCurrent()
   
   let personProfile = []
   let myProfile = []
   let show = false
   
   const requiredGame = FindGame(res[0].required)
   const SelectedGame = FindGame(res[0].selected)

   if(requiredGame && SelectedGame){
        personProfile = FindUser(requiredGame.owner)
        myProfile = FindUser(SelectedGame.owner)

        if(myProfile && personProfile){

            if(myProfile.id === current.id){
                show=true
            }
            if(personProfile.id === current.id){
                show=true
            }

        }

   }



    return(
        <div>
            {show ?
            
        <Card className="game-details">
            {requiredGame.cover !== undefined ? <Card.Img src={requiredGame.cover.path} alt={requiredGame.title}/> : "" }
            <Card.Body>
                {requiredGame ?
                <div>
                <Card.Header>
                    <Card.Title>{requiredGame.title}</Card.Title>
                        <p>id da troca: {res[0].id}</p>
                        <Card.Subtitle>para : {requiredGame.platform}</Card.Subtitle>
                        </Card.Header>
                        {personProfile
                        ? <Card.Body>
                            <Card.Text> pertence a:
                                <a href={`/profile/${myProfile.id}`}>
                                     {personProfile.firstName} {personProfile.lastName} 
                                    </a>
                                </Card.Text>
                            <p>{personProfile.email}</p>
                            
                            {res[0].accepted === true ?
                                <p style={{color:"green"}}>aceita</p>
                             : <p style={{color:"red"}}>negada/pendente</p>
                            }          
                        <UpdateRequest id={res[0].id} from={res[0].madeBy} receiver={personProfile.id} status={res[0].accepted} madeBy={res[0].madeBy}/>
                        </Card.Body>
                        :<Card.Text>usuário não encontrado</Card.Text>}

                        

                </div>

                : <Card.Header>
                    <Card.Title>O anuncincio não encontrado ou  excuído</Card.Title>
                </Card.Header>}


                        <Card.Header>
                        <Card.Title>Trocando por: {SelectedGame.title}</Card.Title>
                        <Card.Subtitle>para : {SelectedGame.platform}</Card.Subtitle>
                        {myProfile
                        ?
                        <div>
                            <p>pertence a: <a href={`/profile/${myProfile.id}`}> {myProfile.firstName} {myProfile.lastName} </a></p>
                            <p> {myProfile.email}</p>
                            <a href="#">ir para detalhes</a>
                        </div>
                    
                        :""}

                </Card.Header>
      
            
            </Card.Body>

            
            </Card> : ""}


        </div>
    )
}

/***
 * 
 *  
 */