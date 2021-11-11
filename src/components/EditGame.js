
import { useState,forwardRef,Fragment } from "react"
import {EditGameForm} from './EditForm'


import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide } from '@material-ui/core'

 const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });

     /** A function that allow the user to edit a game information, or delete the game
   * 
   * @param {Object} game - the game to be edited 
   */ 

function EditGame({game}){
    const [open,SetOpen] = useState(false)
    
    const handleClickOpen = () => {
      SetOpen(true);
    };
  
    const handleClose = () => {
      SetOpen(false);
    };



    return(
        <Fragment>
          <Button onClick={handleClickOpen} 
             size="small">Editar</Button>
          
          {open ?
             <Dialog
              open={open} 
             TransitionComponent={Transition}
             keepMounted
             //onClose={handleClose}
             aria-labelledby="alert-dialog-slide-title"
             aria-describedby="alert-dialog-slide-description"
           >
             <DialogTitle id="alert-dialog-slide-title" className="profile-card-header">
               {"Editar "+game.title}
               </DialogTitle>
     
             <DialogContent className="edit-dialog-content">
               <EditGameForm  handleClose={handleClose} game={game} /> 
             </DialogContent>
             
     
           </Dialog> :""}
          
        </Fragment>
    )
}

/**
 *  <EditGameForm  handleClose={handleClose} game={game} />  
 */

export default EditGame