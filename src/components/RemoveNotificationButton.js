import {IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { REMOVENOTIFICATION } from '../api';

/** Button to remove notification
 * 
 * @param {Object} notification - notification to be removed 
 */

export const RemoveNotificationButton = ({notification}) =>{

    const handleRemoveNotification = async () =>{
        await REMOVENOTIFICATION(notification)
        //console.log(response)
    }

    return <IconButton size="small" style={{color:"white"}} href="/notifications" onClick={handleRemoveNotification}>
        <CloseIcon/>
    </IconButton>
}

export default RemoveNotificationButton