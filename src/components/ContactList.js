import { useState} from "react"
import {Redirect} from 'react-router-dom'
import {Paper,Avatar,List} from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {Skeleton} from '@material-ui/lab'

/** List of contacts of the user
 * 
 * @param {Object} user - current user detected by the system
 */

function ContactList ({user}){
    const [selected,SetSelected] = useState(null)

    return (
        <div>
            {user ? 
            <Paper className="dashboard-contacts">
                <List className="dashboard-contacts-list">
                    {user.contacts.length > 0 ? 
                    <AvatarGroup max={4} style={{marginLeft:"20px"}}>
                {user.contacts.map(contact =>
                    <Avatar key={contact.id} 
                    className="contact-photo" 
                    src={contact.picture}
                    onClick={e =>SetSelected(contact.id)}/>
                    )}
                    </AvatarGroup>

                    : 
                    <div>
                        <Skeleton variant="circle" width={40} height={40} animation="wave"/>

                    </div> }
                </List>

            </Paper>
            : <div style={{margin:"20px"}}>
            <Skeleton variant="circle" width={40} height={40} animation="wave"/>

        </div>}

            {selected !== null ? <Redirect to={`messages/${selected}`}/> : ""}

        </div>
    )
}

export default ContactList