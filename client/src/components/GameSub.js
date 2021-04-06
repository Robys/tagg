/**
 * Espaço destinado a jogos que foram adicionados em tempo real
 * 
 * (retirado)
 * **/

import {useSubscription} from '@apollo/react-hooks'
import {NEW_GAME_ADDED} from '../api/subscriptions'
import GameFeedContainer from './GameFeedContainer'

export default function GameSub(){
    const {data} = useSubscription(NEW_GAME_ADDED)

    return (
        <div>
            {data?
            <div> 
                <p>adicionados agora</p>
                <GameFeedContainer game={data.newGameAdded}/> 
            </div> 
            : <p>ainda não á novidades...</p>}
            

        </div>
    )
}