import {Button, Card,Dropdown,DropdownButton,Image} from 'react-bootstrap'
import DelayLink  from 'react-delay-link'
//import generic from '../imgs/generic.png'
import {FindGame,FindUser,FindCurrent,FindCollection} from '../utils/utils'

export default function GameDetails(props){
    const game = FindGame(props.match.params.id)
    const owner = FindUser(game.owner)
    const current = FindCurrent()
    const collection = FindCollection(current.id)
    const array = Object.values(collection)

    var disableRequest = current.id === owner.id
    if(array[0] === undefined){
        disableRequest = false
    }
    console.log(game.cover)
    return(
        <div>
            <Card className="game-details" bg="dark">
                {game.cover !== undefined
                ? 
                <Card.Img src={game.cover.path} alt={game.title}/> 
                :""}
                    <Card.Body>
                        <Card.Header>
                        <Card.Title>{game.title}</Card.Title>
                        <p>id: {game.id}</p>
                        <Card.Subtitle>{game.publisher}</Card.Subtitle>
                        <Card.Text>para : {game.platform}</Card.Text>
                        <Card.Text>{game.status}</Card.Text>
                        <Card.Text>{game.location}</Card.Text>
                        <Card.Text>R$ {game.value}</Card.Text>
                        </Card.Header>

                        <Card.Header>Descrição</Card.Header>
                        <Card.Text>
                            {game.description}
                        </Card.Text>

                        {owner
                        ? 
                    <Card className="game-details-footer" bg="dark">
                        
                    <Card.Img src={owner.picture} alt={owner.firstName}/>
                    <Card.Header>
                    <Card.Title>{owner.firstName} {owner.lastName}</Card.Title>
                    <Card.Subtitle>{owner.email}</Card.Subtitle>
                    <DelayLink to={`/profile/${owner.id}`}>ir para perfil</DelayLink>
                    </Card.Header>
                    <Card.Body>

                    <Button
                    style={{float:"right"}}  variant="danger"
                    disabled={!disableRequest} href={`/deleteGame/${game.id}`}>
                            Excluir Game
                     </Button>

                    <DropdownButton disabled={disableRequest} title="Propor troca">
                    {array.map(item =>
                    item.map( mygame =>
                        <Dropdown.Item key={mygame.id} as="button">
                            <div>
                            <Image src={mygame.cover.path} alt={mygame.title} 
                            style={{width:"40px",height:"60px",marginRight:"10px"}}/>
                            <DelayLink delay={1000}
                                to={{
                                    pathname: "/processrequest",
                                    state: { selected:mygame, required: game}
                                }}> {mygame.title} para {mygame.platform}
                            </DelayLink>
                            </div>
                        </Dropdown.Item>
                        )
                    )}
                    </DropdownButton>

                    </Card.Body>
                    </Card>
                    : <p>O usuário dono deste game não foi encontrado, ou a conta não existe mais.</p>   }
                        
                    </Card.Body>

            </Card>

        </div>
    )
}

/*



            {selected!==undefined
            ?<Redirect to={{path:`/processrequest`, state: {selected, required:game} }}/> 
            : "" }

<Card.Img src={game.cover.path} alt={game.title}/>

 <Button href={`/createRequest/${game.id}`} >Propor Troca</Button>

<Card className="profile" bg="dark">
        <Card.Img src={owner.picture} alt={owner.firstName}/>
        <Card.Body className="profile-info">
                    <h3>{owner.firstName} {owner.lastName}</h3>
                     <p>{owner.email}</p>
                 <p>de: {owner.location}</p>
        </Card.Body>
    </Card>



*/
