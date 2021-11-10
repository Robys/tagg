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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {ADDTOCONTACTSLIST} from '../api'


const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });

/**These button allow the user to add another user to your contacts list
 * 
 * @param {Object} owner - the owner of the game, or the other user to be added  
 * @param {Object} currentUser - the logged user, detected by the system
 * 
 */

   
const AddToContactsButton = ({owner,currentUser}) =>{
     
     const [open,SetOpen] = useState(false)
     
     const [isAdded,setIsAdded] = useState(false)
     const [error,SetError] = useState({onError:false,message:''})
     
    const handleClickOpen = () => {
        SetOpen(true);
      };
    
      const handleClose = () => {
        SetOpen(false);
      };

      const CanAddMessage = ({owner}) =>{
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
            Deseja adicionar {owner.firstName} aos contatos?
            </DialogTitle>

          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Uma notificação será encaminhada para {owner.firstName} informando sua 
            itenção de manter contato
          </DialogContentText>
      
          <DialogActions>
                  <Button onClick={handleAddPerson}>Ok</Button>
                  <Button onClick={handleClose}>Fechar</Button>
      
              </DialogActions>
      
        </DialogContent>
        </Dialog>
        )
      }
      const CanNotAddMessage = ({message}) =>{
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
      const SuccessAddMessage = () =>{
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
            Tudo ok! contato adicionado com sucesso!
          </DialogContentText>
      
          <DialogActions>

                  <Button onClick={handleClose}>Fechar</Button>
      
              </DialogActions>
      
        </DialogContent>

        </Dialog>
        )
      }

    const handleAddPerson = async () =>{
     await ADDTOCONTACTSLIST(currentUser.id,owner.id).then(res => {
       if(res.errors){
        handleOnError(res.errors[0])
      }
      if(res.data !== null){
        setIsAdded(true)
      }
    })
  }
  
  const handleOnError = (error) =>{
      SetError({onError:true,message:error.message})
      setIsAdded(false)
    }
    

    return(
        <div>
        <IconButton size="small" style={{color:"white"}} onClick={handleClickOpen}>
            <PersonAddIcon/>
        </IconButton>

          <CanAddMessage owner = {owner} />
            
          {isAdded ? <SuccessAddMessage/> : "" }
          {error.onError ? <CanNotAddMessage message={error.message}/> :""}

        </div>
    )
}

export default AddToContactsButton