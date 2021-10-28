import { useEffect,useState } from 'react'
import TopBar from '../components/TopBar'
import {CREATEREQUEST} from '../api'
import {Card,CardHeader,CardContent,Typography,CardActions,Button} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

/** A loading page, process the crated request
 * information to be saved in the database
 * 
 *  *the received information came from props.location.state
 * 
 * @param {Object} selected - game selected by the user to make the request 
 * @param {Object} requested - requested game from the other user 
 */


function ProcessRequest(props){
    const requested =props.location.state.requested
    const selected =props.location.state.selected
    const [onSuccess,SetOnSuccess] = useState(null)
    const [onError,SetOnError] = useState({isError:false,message:''})

    useEffect(()=>{
        const createRequest = async () =>{
             await CREATEREQUEST(requested,selected)
            .then(res => {
                if(res.data.data.createRequest!==undefined){
                    SetOnSuccess(res.data.data.createRequest)
                }
                if(res.data.error !== undefined){
                    SetOnError({isError:true,message:"aconteceu algum erro, tente mais tarde"})
                }
            })

        }

        createRequest()

    },[requested,selected])

    return(
        <div>
            <TopBar/>
            
            {onSuccess !== null ? 
            <Card className="process-success">
                <CardHeader className="process-success-header"
                title="Pedido de troca"/>
                <CardContent className="process-success-content">
                <Typography gutterBottom variant="h5" component="h2"> Sucesso! </Typography>
                
                <CheckCircleOutlineIcon fontSize="large" style={{margin:"20px"}}/>
                
                <Typography variant="body2" color="textSecondary" component="p">
                    o pedido com id: {onSuccess.id} foi concluído.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {onSuccess.selected.owner.firstName} receberá uma notificação sobre este pedido.
                </Typography>

                </CardContent>
                <CardActions className="process-actions">
                    <Button href="/dashboard" style={{backgroundColor:"#45FF8F"}}>continuar</Button>
                </CardActions>
            </Card>
            
            : "carregando..." }
            {onError.isError === true ? 
            <Card className="process-error">
            <CardHeader className="process-error-header"
            title="Pedido de troca"/>
            <CardContent className="process-error-content">
            <Typography gutterBottom variant="h5" component="h2"> Ops! </Typography>
           
            <ErrorOutlineIcon fontSize="large" style={{margin:"20px"}}/>
            
            <Typography variant="body2" color="textSecondary" component="p">
                ocorreu um erro com o pedido : {onError.message}
            </Typography>

            </CardContent>
            <CardActions className="process-actions">
                <Button href="/dashboard" style={{backgroundColor:"#45FF8F"}}>continuar</Button>
            </CardActions>
        </Card> : "carregando..."}



        </div>
    )
}

export default ProcessRequest