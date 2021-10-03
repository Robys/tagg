import { useState } from "react"
import {DELETEUSER} from '../api'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent, 
    DialogActions} from '@material-ui/core'

/** These button delete the user account, in tools section
 * 
 * @param {Object} user - the account to be deleted
 * @param {Object} current - current user stored in the app context 
 *  
 */

const AdminDeleteAccountButton = ({user,current})=>{
    const [open,SetOpen] = useState(false)

    const handleClickOpen = () => {
        SetOpen(true);
      };

      const handleClose = () => {
        SetOpen(false);
      };

      const onDeleteButton = async () =>{
          const response = await DELETEUSER(user.id)
          console.log(response)
          handleClose()
      }
      

    return (
        <div>
          {current.roles === "MANAGER" ?
          <Button size="small" color="secondary" 
          onClick={handleClickOpen}>Excluir conta</Button>
           :""}
            
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
          {"antes de usar esta opção certifique-se de notificar o usuário previamente"}
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}> Fechar </Button>
              <Button onClick={onDeleteButton}>Excluir</Button>
            
        </DialogActions>

        </Dialog>
          : ""}

        </div>
    )
}

export default AdminDeleteAccountButton