/**
 * Espaço destinado a jogos que foram adicionados em tempo real
 * **/


import {useSubscription} from '@apollo/react-hooks'
import {NEW_GAME_ADDED} from '../api/subscriptions'
import GameFeedContainer from './GameFeedContainer'

export default function GameSub(){
    const {data} = useSubscription(NEW_GAME_ADDED)

    return (
        <div>
            <p>adicionados agora</p>
            {data? <GameFeedContainer game={data.newGameAdded}/> : ""}
            

        </div>
    )
}