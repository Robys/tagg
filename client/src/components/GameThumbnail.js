import React from 'react'
import {Card} from 'react-bootstrap'

const GameThumbnail = (props) =>{
   
    return (
      <div>
          {props.games.map(game => 
            <Card className="game-thumb">
            <Card.Img src={game.cover.path} alt={game.title}/>
            <Card.Body>
                <Card.Title ><a href={`/details/${game.id}`}> {game.title} </a></Card.Title>
                 <p>for: {game.platform}</p>
            </Card.Body>

        </Card>
            
            
            )}

      </div>
    )
}

export default GameThumbnail;

/**
 *   
 */