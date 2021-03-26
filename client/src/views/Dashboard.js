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
