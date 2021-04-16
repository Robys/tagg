/**
 * Cartão com informações do jogo (presente na tela de perfil)
 * **/

import React from 'react'
import {Card} from 'react-bootstrap'

const GameThumbnail = (props) =>{
   
    return (
      <ul>
          {props.games.map(game =>
          <li key={game.id}>

            <Card className="game-thumb">
            <Card.Img src={game.cover.path} alt={game.title}/>
            <Card.Body>
                <Card.Title ><a href={`/details/${game.id}`}> {game.title} </a></Card.Title>
                 <p>for: {game.platform}</p>
            </Card.Body>

        </Card>

          </li> 
            
            
            )}

      </ul>
    )
}

export default GameThumbnail;

/**
 *   
 */