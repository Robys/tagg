import { useState } from "react"
import {DELETEUSER} from '../api'
import {Redirect} from 'react-router-dom'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent, 
    DialogActions} from '@material-ui/core'

/** These button the delete the user account
 * 
 * @param {Object} user - the account to be deleted
 *  
 */

const DeleteUserButton = ({user})=>{

    const [open,SetOpen] = useState(false)
    const [ready,SetReady] = useState(false)

    const handleClickOpen = () => {
        SetOpen(true);
      };

      const handleClose = () => {
        SetOpen(false);
      };

      const onDeleteButton = async () =>{
          await DELETEUSER(user.id)
          //console.log(response)
          SetReady(true);
      }
      

    return (
        <div>
            <Button size="small" 
            variant="contained" color="secondary" 
            onClick={handleClickOpen}>Excluir conta</Button>
          { open ?
          <Dialog
          open={open} 
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" className="profile-card-header">
            {"Tem certeza disso?"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
          {"sentiremos sua falta, caso queria você pode somente desativar sua conta"}
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}> Fechar </Button>
              <Button onClick={onDeleteButton}>Excluir</Button>
            
        </DialogActions>

        </Dialog>
          : ""}

          {ready ? <Redirect to="/"/> :""}

        </div>
    )
}

export default DeleteUserButton