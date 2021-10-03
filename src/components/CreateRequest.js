import { useState } from "react"
import {useAppContext} from '../utils/UserContext'
import {Redirect} from 'react-router-dom'
import {Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Typography} from '@material-ui/core';

/** A dialog screen, 
 * allow the user to select a game in your collection
 * to ofer to another person
 * 
 * @param {Object} requested - game the user want from the other user.
 * @param {Function} SetOpen - hook function to toggle the dialog.
 * @param {Boolean} open - current value to toogle the dialog.
 *  
 */

function CreateRequest ({requested,SetOpen,open}){
    const [selected,SetSelected] = useState(null)
    const [ready,SetReady] = useState(false)
    const {user} = useAppContext()

    const handleClose = () => {
        SetOpen(false);
      }; 

    return (
    <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle className="profile-card-header">
            Requisitar Troca
        </DialogTitle>

        <DialogContent style={{marginTop:"20px"}}>
            <Typography variant="h6">
                Escolha um jogo de sua coleção que deseja trocar por {requested.title}
            </Typography>
            <List>
                {user ? 
                user.gamecollection.map(item => 
                    <ListItem key={item.id} onClick={e => SetSelected(item)}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={item.cover}/>
                        </ListItemAvatar>
                        <ListItemText primary={item.title} secondary={item.platform} />
                    </ListItem>)
                : ""}

            </List>
        <DialogActions>
            {selected !== null ? <Button onClick={e => SetReady(true)}> Enviar </Button> : ""}
            {ready === true ? 
            <Redirect
            to={{
                pathname: "/processrequest",
                state: { requested,selected }
            }}
            /> 
            :""}
            <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
        </DialogContent>
    </Dialog>

    )
}

export default CreateRequest