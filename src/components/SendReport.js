import {useState,forwardRef} from 'react'
import {ReportForm} from './EditForm'
import { useAppContext } from '../utils/UserContext'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide} from '@material-ui/core'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
   

export default function SendReport(){
    const {user} = useAppContext()
    const [open,SetOpen] = useState(false);

    const handleClickOpen = () => {
        SetOpen(true);
      };
    
      const handleClose = () => {
        SetOpen(false);
      };

    return(
        <div>
            <Button onClick={handleClickOpen}>Reportar</Button>
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
            {"Reportar"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
              <div>
                  <p>
                      Você pode reportar aos administradores qualquer
                      atividade estranha.

                      *lembre-se de fornecer o máximo de informações
                      sobre o assunto/ocorrido.
                  </p>
              </div>

            <ReportForm sender={user} HandleClose={handleClose}/>
            <Button onClick={handleClose}>Fechar</Button>

        </DialogContent>

        </Dialog>
            
            
            :""}
        </div>
    )
}

// 