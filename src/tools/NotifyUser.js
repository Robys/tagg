import { useState,
  forwardRef,
  Fragment} from "react"
import { useAppContext } from '../utils/UserContext'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide} from '@material-ui/core'

import {UpdateReportForm} from '../components/EditForm'

 const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });

/**
 * These function allow the user create a notification to other user,
 * or answer a report 
 * @param {Object} other - user to receive the notification
 * @param {Object} report - report to be answered
 */
function NotifyUser ({other,report}){
    const {user} = useAppContext()

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
             size="small">Notificar</Button>

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
           Notificar
           </DialogTitle>

         <DialogContent className="edit-dialog-content">
           Aqui você pode enviar uma notificação, informando o usuário ou respondendo 
           á alguma solicitação.

             <UpdateReportForm currentUser={user} report={report}
             receiver={other} HandleClose={handleClose} />

       </DialogContent>

       </Dialog>
         :""}

        </Fragment>
    )
}

export default NotifyUser
