import { useState,useEffect } from 'react'
import {GETUSERBYID} from '../api'
import TopBar from '../components/TopBar'
import AddGame from '../components/AddGame'
import Collection from '../components/Collection'
import AddToContactsButton from '../components/AddToContactsButton'
import EditUser from '../components/EditUser'

import {Card,
    CardMedia, 
    CardActions, 
    CardContent,
    Typography,
    CardHeader} from '@material-ui/core';
    
import { useAppContext } from '../utils/UserContext'

/** The profile page have all the information of the current user, or other account selected
 * 
 * @constructor
 * @param {*} props - props.match.params.id
 */

function Profile (props) {
    const [profile,SetProfile] = useState(null)
    const [isCurrentUser,SetCurrentUser] = useState()
    var {user} = useAppContext()

    const id = props.match.params.id

    useEffect(()=>{
        const getProfile = async () => {
            const userById = await GETUSERBYID(id)
            SetProfile(userById);
            if(user)
                SetCurrentUser(user.id === userById.id)
        }

        getProfile()

    },[id,user])

    return (
        <div>
            <TopBar user={user}/>
            {profile !== null ? 
            <Card className="profile-card" variant="outlined">
 
                <CardMedia
                    className="profile-media"
                    image={profile.picture}
                    title={profile.firstName}
                    />

               <CardHeader title={`${profile.firstName} ${profile.lastName}`} 
               className="profile-card-header"
               action={isCurrentUser === false ?
                <AddToContactsButton owner={profile} currentUser={user}/>
                : ""}/> 
            <CardContent>

            <Typography variant="body2" color="textSecondary" component="p">
            {profile.email}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            status: {profile.active ? "ativo" : "desativado" }
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            de: {profile.location}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            desde: {profile.createdAt}
          </Typography>

         
              {isCurrentUser === true ? 
          <CardActions>
                <EditUser user={user}/> 
            </CardActions>
              :""}
        </CardContent>

            </Card> : ""}

        <AddGame isCurrentUser={isCurrentUser}/>

        {profile ? <Collection collection={profile.gamecollection}/>  :""}
        
        </div>
    )

}

export default Profile