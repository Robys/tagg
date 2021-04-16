/**
 * Tela inicial ("mestre") da aplicação, 
 * dispõe os jogos e as notificações (caso esteja utilizando Desktop)
 * **/

import MyNotifications from '../components/MyNotifications'
import GameFeed from '../components/GameFeed'
import TopBar from '../utils/TopBar'

export default function Dashboard(){

    return(
        <div>
        <TopBar/>

        <ul className="dashboard">
            <li>
            <GameFeed/>
            </li>
            <li>
            <MyNotifications/>
            </li>
        </ul>

        </div>

    )
}
