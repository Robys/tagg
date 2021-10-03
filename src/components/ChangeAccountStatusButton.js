import { useState } from "react"
import {CHANGEACCOUNTSTATUS} from '../api'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent, 
    DialogActions} from '@material-ui/core'

/** These button toggle the active state of the user on the app
 * 
 * @param {Object} user - the account to active/deactivate
 *  
 */

const ChangeAccountStatusButton = ({user})=>{

    const [open,SetOpen] = useState(false)

    const handleClickOpen = () => {
        SetOpen(true);
      };

      const handleClose = () => {
        SetOpen(false);
      };

      const handleAccountUpdate = async (status) =>{
          const response = await CHANGEACCOUNTSTATUS(user,status)
          console.log(response)
          handleClose()
      }

    return (
        <div>
            <Button size="small" 
            variant="contained" color="secondary" 
            onClick={handleClickOpen}>Desativar</Button>
          { open ?
          <Dialog
          open={open} 
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" className="profile-card-header">
            {user.active === true ? "Desativar conta" : "Ativar conta"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
          {user.active === true ? 
          "Com sua conta desativada você não poderá adicionar jogos, receber mais trocas, e não poderá interagir com outros usuários" 
          : "Deseja ativar sua conta?"}
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}> Fechar </Button>
            {user.active === true ? 
              <Button onClick={e =>handleAccountUpdate(false)}>Desativar</Button>
          : <Button onClick={e =>handleAccountUpdate(true)}>Ativar</Button>}
            
        </DialogActions>

        </Dialog>
          : ""}

        </div>
    )
}

export default ChangeAccountStatusButton