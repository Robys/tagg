import { useState,useEffect,forwardRef,Fragment } from 'react'
import {LOGIN} from '../api'

import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Slide } from '@material-ui/core'

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
   

/** A loading page, process the crated account
 * information before access the application
 * 
 * @param {string} email - user email 
 * @param {string} password - user password 
 */

function ProcessSignUp({email,password}){

    const [error,SetError] = useState({onError:false,message:''}) 
    const [ready,SetReady] = useState(false)
    const [loading,SetLoading] = useState({state:false})

    useEffect(()=>{
        const loginAttempt = async ()=>{
            SetLoading({state:true})
            const res = await LOGIN(email,password)
            console.log(res)
            if(res.data.data.login!==null){
                
                SetReady(true)
                SetLoading({state:false})
            }
            else if(res.data.data.errors!==null){
                const err = res.data.errors
                SetLoading({state:false})
                err.map(item => {
                    return SetError({onError:true,message:item.message})
                    
                })
            }
        }

        loginAttempt();

    },[email,password])

    const SuccesDialog = ({ready}) =>{
        return (
          <Dialog
          fullScreen open={ready} 
          TransitionComponent={Transition}
          keepMounted
          //onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            {"Tudo pronto!"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
              sua conta foi criada com sucesso!
              aproveite!
              <DialogActions>

                  <Button href="/dashboard">Avançar</Button>
              </DialogActions>

        </DialogContent>

        </Dialog>
        )
      }

      const ErrorDialog = ({onError,message}) =>{
        return (
          <Dialog
          fullScreen open={onError} 
          TransitionComponent={Transition}
          keepMounted
          //onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            {"Desculpe"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
              Aconteceu algum problema : {message}
            <DialogActions>

                  <Button href="/login">Voltar</Button>
              </DialogActions>

        </DialogContent>

        </Dialog>
        )
      }

      const LoadingDialog = () =>{
        return (
          <Dialog
          fullScreen open={loading.state} 
          TransitionComponent={Transition}
          keepMounted
          //onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            {"Só mais um pouco"}
            </DialogTitle>

          <DialogContent className="edit-dialog-content">
              O tagg está preparando sua conta!
            <DialogActions>
                
              </DialogActions>

        </DialogContent>

        </Dialog>
        )
      }


    return(
        <Fragment>
            <LoadingDialog/>
            {ready ? <SuccesDialog ready={ready}/> : ""}
            {error.onError ? 
            <ErrorDialog 
            onError={error.onError} 
            message={error.message}/> 
            : ""}
             

        </Fragment>
    )
}

export default ProcessSignUp