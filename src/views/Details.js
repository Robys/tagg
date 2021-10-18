import { useState,useEffect,Fragment} from 'react'
import { useAppContext } from '../utils/UserContext'
import {GETGAME} from '../api'
import TopBar from '../components/TopBar'
import {Card,
    CardMedia,
    Avatar,  
    CardActions, 
    CardContent,
    Typography,
    CardHeader,
    Button} from '@material-ui/core';

import AddToContactsButton from '../components/AddToContactsButton';
import EditGame from '../components/EditGame'
import CreateRequest from '../components/CreateRequest';

import SendReport from '../components/SendReport';

/** The details page shows all the information about the game,
 *  and provide information about the owner.
 * 
 * @constructor
 * @param {*} props - props.match.params.id to find the game
 */


function Details(props){

    const id = props.match.params.id

    const [game,SetGame] = useState()
    const {user} = useAppContext()
    const [isCurrentUser,SetCurrentUser] = useState()
    const [openRequest,SetOpenRequest] = useState(false)

    useEffect(()=>{
        const getGame = async () =>{
            const response = await GETGAME(id)
            SetGame(response)
            if(user)
                SetCurrentUser(user.id === response.owner.id)
        }
 
        getGame();

    },[id,user])



    return (
        <div>
            <TopBar user={user}/>
            <Card className="profile-card" variant="outlined">
            
                {game ?
                <CardMedia
                className="profile-media"
                image={game.cover}
                title={game.title}
                /> : ""}

                {game ? 
                <CardHeader title={game.title} 
                className="profile-card-header"/> 
                :""}

                {game ?
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                id: {game.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                genêro: {game.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                para: {game.platform}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                situação: {game.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                valor: R$ {game.value}
                </Typography>
    
    
                </CardContent> 
                
                :""}
            </Card>

            {game? 
            <Card className="profile-card" variant="outlined">
                {game ? 
                <CardHeader title="Descrição" 
                className="profile-card-header"/> 
                :""}
            <CardContent>

            <Typography variant="body2" color="textSecondary" component="p">
                {game.description}
            </Typography>


            </CardContent>

            </Card>
            :""}

            {game ? 
                <Card key={game.owner.id} className="game-details-owner">
                    <CardHeader className="profile-card-header"
                    avatar={<Avatar area-label="owner-photo" src={game.owner.picture}/>}
                    title={`${game.owner.firstName} ${game.owner.lastName} `}
                    subheader={game.owner.email}
                    action={!isCurrentUser? 
                        <AddToContactsButton owner={game.owner} currentUser={user}/>
                    :""}>
                </CardHeader>

                <CardActions className="game-details-actions">
                {isCurrentUser === true?
                <Fragment>
                <Button size="small" color="secondary" href={`/profile/${game.owner.id}`}>
                ir até o meu perfil</Button>

                {game ? <EditGame game={game}/> : ""}

                </Fragment>
                : 
                <Fragment>
                <Button size="small" color="secondary" href={`/profile/${game.owner.id}`}>
                ir até o perfil</Button>
                <Button onClick={e => SetOpenRequest(true)} 
                size="small">Propor troca</Button>

                <SendReport/>
                </Fragment>
                }
                </CardActions> 

                {openRequest === true ? 
                <CreateRequest 
                requested={game} 
                open={openRequest}
                SetOpen={SetOpenRequest}/>   :""}
                
                </Card>
                :""}

        </div>
    )
}

/**
 *      
 */

export default Details
