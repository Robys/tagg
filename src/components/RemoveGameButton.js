import { useState,forwardRef } from "react"
import {DELETEGAME} from '../api'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide } from '@material-ui/core'

 const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });

/** Allow the user to delete the game from the data base
 * 
 * @param {Object} game - game to be deleted 
 */

const RemoveGameButton = ({game})=>{
    const [open,SetOpen] = useState(false)
     
    
    const handleClickOpen = () => {
        SetOpen(true);
      };
    
      const handleClose = () => {
        SetOpen(false);
      };

      const handleDeleteGame = async () =>{
          const response = await DELETEGAME(game.id);
          console.log(response)
      }


    return(
        <div>
            <Button size="small" color="secondary" onClick={handleClickOpen}>Excuir</Button>
            {open ?
                 <Dialog
                 open={open}
                 TransitionComponent={Transition}
                 keepMounted
                 onClose={handleClose}
                 aria-labelledby="alert-dialog-slide-title"
                 aria-describedby="alert-dialog-slide-description"
               >
                   <DialogTitle id="alert-dialog-slide-title" className="profile-card-header">
                   {"Tem certeza que quer exluir "+ game.title + "?"}
                   </DialogTitle>
         
                 <DialogContent>
                     <DialogContentText>
                         O jogo será removido de sua coleção para sempre, pense bem...
                     </DialogContentText>
         
             
                 <DialogActions>
                         <Button size="small" variant="contained" 
                         color="primary" onClick={handleDeleteGame}>Ok</Button>
                         <Button onClick={handleClose}>Fechar</Button>
             
                     </DialogActions>
             
               </DialogContent>
               </Dialog> 
               :""}
        </div>
    )
}

export default RemoveGameButton