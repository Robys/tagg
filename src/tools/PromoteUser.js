import { useState,forwardRef,Fragment } from 'react';
import {PROMOTEUSER} from '../api'

import {
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide, 
    DialogActions} from '@material-ui/core'

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });


/**
 * Allow the administrator or manager promote a user to a new responsibility level
 * 
 * @param {Object} user - user to be promoted
 */
function PromoteUser ({user}){

    const [open,SetOpen] = useState(false)
    const [value,SetValue] = useState("")

    //const [error,SetError] = useState({onError:false,message:''});

    const handleChange = (event) => {
      event.preventDefault();
      SetValue(event.target.value);
    };
    
    const handleClickOpen = () => {
      SetOpen(true);

    };
  
    const handleClose = () => {
      SetOpen(false);
    };

    const handlePromotion = async () =>{
      const response = await PROMOTEUSER(user,value)
      handleClose()
      console.log(response)
    }

    return (
        <Fragment>

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
               Promover Usuário
               </DialogTitle>
   
             <DialogContent className="edit-dialog-content">
               <div>
                   Nesta opção você pode (dependendo do seu nível de acesso) 
                   promover outro usuário á administrador, ou retorná-lo a
                   usuário comum.
               </div>
  
               <DialogActions style={{marginTop:"10px"}}>
               <FormControl component="fieldset">
                  <FormLabel component="legend">Nível de Responsabilidade</FormLabel>
                  <RadioGroup aria-label="roles" name="roles" value={value} onChange={handleChange}>
                    <FormControlLabel value="USER" control={<Radio />} label="usuário" />
                    <FormControlLabel value="ADMIN" control={<Radio />} label="administrador" />
                    <FormControlLabel value="MANAGER" control={<Radio />} label="gerente" />
                  </RadioGroup>
                </FormControl>
  
               </DialogActions>
  
           <DialogActions>
             {value!=="" ?
                <Button onClick={handlePromotion}>
                    Salvar
                </Button> : ""}
   
               <Button onClick={handleClose}>Fechar</Button>
           </DialogActions>
  
           </DialogContent>
   
   
           </Dialog>
           :""}
    
            <Button onClick={handleClickOpen} size="small">Promover</Button>
        </Fragment>
    )  

}

export default PromoteUser
