import { Fragment } from 'react'
import {ListItem,ListItemAvatar,Avatar,ListItemText,Typography} from '@material-ui/core'

/** Message from a user to another.
 * @constructor
 * @param {Object} message - message in the chat list
 * 
 * @example
 * const receiver = Object (User)
 * const picture = receiver.picture ("www.pictureURL.com")
 * const content = message.content ("text message")
 * const createdAt = message.createdAt ("01/01/2021")
 * 
 * const message = {receiver,content,createdAt}
 *  return ( <Message message={message}/> )
 */


function Message ({message}){
    //console.log(message)

    return(
    <ListItem style={{marginTop:"10px"}}>
        <ListItemAvatar>
            <Avatar src={message.receiver.picture}/>
        </ListItemAvatar>
        <ListItemText primary={message.receiver.firstName} 
        secondary={<Fragment>
            {message.content}
            <Typography variant="caption" display="block">{message.createdAt}</Typography>
            
        </Fragment>}/>
    </ListItem>

    )
}


export default Message