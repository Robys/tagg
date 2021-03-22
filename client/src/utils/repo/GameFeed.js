import {useSubscription} from '@apollo/react-hooks'
import {NEW_GAME_ADDED} from '../api/subscriptions'

import LoadingFeed from './LoadingFeed'
import GameFeedContainer from './GameFeedContainer'

export default function GameFeed(){
    const {data,loading,error} = useSubscription(NEW_GAME_ADDED)

    if (loading||error) return <LoadingFeed/>
    return (
        <div>
            <p>adicionados agora</p>
            {data? <GameFeedContainer game={data.newGameAdded}/> : ""}
            

        </div>
    )
}

/* <GameFeedContainer gameAdded={data.newGameAdded} /> */