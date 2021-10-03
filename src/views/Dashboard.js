import { useAppContext } from '../utils/UserContext'
import TopBar from '../components/TopBar'
import GamesList from '../components/GamesList'
import ContactList from '../components/ContactList'
import Notifications from '../components/Notifications'

import {useMediaQuery} from '@material-ui/core'

/**
 * Dashboard is the main application view.
 * 
 * @param {Object} user - logged user detected by the system 
 */

function Dashboard (){

    const mediaMatch = useMediaQuery('(max-width: 768px)');
    var {user} = useAppContext()


    return (
        <div>
            <TopBar user={user}/>
            <ContactList user={user}/>
            <GamesList/>
            <div style={mediaMatch ? {display:"none"} : {float:"left",margin:"30px"}}>
            <Notifications user={user}/>
            </div>
        </div>
    )
}

export default Dashboard