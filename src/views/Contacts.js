import {useState} from 'react'
import { useAppContext } from '../utils/UserContext'
import {Redirect} from 'react-router-dom'
import TopBar from '../components/TopBar'
import { RemoveToContactsButton } from '../components/RemoveToContactsButton';

import {List,
    ListItem,
    ListItemSecondaryAction,
    Typography,
    ListItemText,
    ListItemAvatar,
    Avatar} from '@material-ui/core';

/** These view contains the list of all users contacts
 * 
 * @param {Object} user - logged user detected by the system 
 * @param {Object} selected - selected contact (other user) for send a message 
 * 
 */


function Contacts (){
    const [selected,SetSelected] = useState(null)
    const {user} = useAppContext()

    return (
        <div>
            <TopBar user={user}/>
            <List dense className="contacts">
                {user ?
                user.contacts.map(contact => 
                    <ListItem key={contact.id} onClick={e => SetSelected(contact.id)}>
                        <ListItemAvatar>
                        <Avatar className="contact-photo" src={contact.picture}/>
                        </ListItemAvatar>
                    <ListItemText id={contact.id} 
                    primary={contact.firstName}
                    secondary={<Typography>{contact.lastName}</Typography>}/>
                    <ListItemSecondaryAction>
                        <RemoveToContactsButton owner={contact} currentUser={user}/>
                    </ListItemSecondaryAction>

                    
                    </ListItem>) 
                
                : "Você ainda não possui contatos adicionados"}
            {selected !== null ? <Redirect to={`messages/${selected}`}/> : ""}

            </List>

        </div>
    )
}

export default Contacts