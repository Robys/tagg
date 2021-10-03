import { useAppContext } from '../utils/UserContext'
import TopBar from '../components/TopBar'
import Notifications from '../components/Notifications'

/** Notification view, accessed from TopBar link
 * 
 * @param {Object} user - logged user detected by the system 
 */

function NotificationsView (){
    const {user} = useAppContext()
    return (
        <div>
            <TopBar user={user}/>
            <Notifications user={user}/>
        </div>
    )
}

export default NotificationsView