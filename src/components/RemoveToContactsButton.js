import { useState } from 'react';
import { forwardRef } from 'react';
import {IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide } from '@material-ui/core'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {REMOVETOCONTACTLIST} from '../api'

 const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });

   
export const RemoveToContactsButton = ({owner,currentUser}) =>{
     
     const [open,SetOpen] = useState(false)
     
     const [isRemoved,SetRemoved] = useState(false)
     const [error,SetError] = useState({onError:false,message:''})
     
    const handleClickOpen = () => {
        SetOpen(true);
      };
    
      const handleClose = () => {
        SetOpen(false);
      };

      const RemoveMessage = (owner) =>{
        return (
          <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" className="profile-card-header">
            Tem certeza mesmo?
            </DialogTitle>

          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deseja remover {owner.firstName} dos seus contatos?
          </DialogContentText>
      
          <DialogActions>
                  <Button onClick={handleRemovePerson}>Tudo bem</Button>
                  <Button onClick={handleClose}>Fechar</Button>
      
              </DialogActions>
      
        </DialogContent>
        </Dialog>
        )
      }
      const CanNotRemoveMessage = ({message}) =>{
        return (
          <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
      
          <DialogActions>
                  <Button onClick={handleClose}>Ok</Button>
                  <Button onClick={handleClose}>Fechar</Button>
      
              </DialogActions>
      
        </DialogContent>

        </Dialog>

        )
      }
      const SuccessMessage = () =>{
        return (
          <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >

          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tudo ok! contato removido com sucesso!
          </DialogContentText>
      
          <DialogActions>

                  <Button onClick={handleClose}>Fechar</Button>
      
              </DialogActions>
      
        </DialogContent>

        </Dialog>
        )
      }

    const handleRemovePerson = async () =>{
     await REMOVETOCONTACTLIST(currentUser,owner).then(res => {
       if(res.errors){
        handleOnError(res.errors[0])
      }
      if(res.data !== null){
        SetRemoved(true)
      }
    })
  }
  
  const handleOnError = (error) =>{
      SetError({onError:true,message:error.message})
      SetRemoved(false)
    }
    

    return(
        <div>
        <IconButton size="small" onClick={handleClickOpen}>
            <PersonAddDisabledIcon/>
        </IconButton>

          <RemoveMessage owner = {owner} />
            
          {isRemoved ? <SuccessMessage/> : "" }
          {error.onError ? <CanNotRemoveMessage message={error.message}/> :""}

        </div>
    )
}