
import { useState,forwardRef,Fragment} from "react"
import  {EditUserForm}  from './EditForm';
import DeleteUserButton from "./DeleteUserButton";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide } from '@material-ui/core'

 const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });

  /** A function that allow the user to edit your information, or activate/deactivate
   * the account
   * 
   * @param {Object} user - the user to be edited 
   */ 

function EditUser({user}){

    
    const [open,SetOpen] = useState(false)
  
    const handleClose = () => {
      SetOpen(false);
    };


    return(
        <Fragment>
             <Button onClick={e => SetOpen(true)} 
             size="small"color="secondary">editar perfil</Button>

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
            {"Editar perfíl"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
            <EditUserForm  handleClose={handleClose} user={user} />
            <DeleteUserButton user={user}/>
        </DialogContent>

        </Dialog> : ""}

        </Fragment>
    )
}

export default EditUser