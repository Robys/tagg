import {forwardRef} from 'react'
import {useAppContext} from "../utils/UserContext"
import {Redirect} from 'react-router-dom'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Slide } from '@material-ui/core'

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

/**
 * Loading screen before access the dashboard screen.
 * This step is important becouse a user is needed in the application
 * context.
 * 
 * @param {Object} user - user stored in the app context
 * @param {Boolean} loading - toggle if the user exist or not
 */

function ProcessLogin (context){
    var {user,loading} = useAppContext()

    user = loading ? user:context 

    return (
        <div>
            {loading ? 

            <Dialog
                fullScreen open={loading} 
                TransitionComponent={Transition}
                keepMounted>
                
                 <DialogTitle id="alert-dialog-slide-title">
                    {"Bem vindo"}
                </DialogTitle>

                <DialogContent className="edit-dialog-content">
                Carregando...
                </DialogContent>

            </Dialog>
            
            :""}
            {user ? <Redirect to="/dashboard"/> :""}

        </div>
    )

}

export default ProcessLogin