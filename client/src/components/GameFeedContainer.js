/**
 * Carão de anuncio dos jogos, presente na tela inicial
 */

import {Card, Button} from 'react-bootstrap'

export default function GameFeedContainer(props){


    return( 
        <Card className="game-container">
                <Card.Img src={props.game.cover.path}/>
                    <Card.Body className="game-container-body">
                        <Card.Title>{props.game.title}</Card.Title>
                        <Card.Subtitle>{props.game.platform}</Card.Subtitle>
                        <Card.Text>{props.game.location}</Card.Text>
                        <Card.Text>{props.game.status}</Card.Text>
                        <Button href={`details/${props.game.id}`}>Detalhes</Button>
                    </Card.Body>

        </Card>
        
    )
}

/***
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */