import { useEffect,useState } from 'react'
import { useAppContext } from '../utils/UserContext'
import TopBar from '../components/TopBar'
import RequestCard from '../components/RequestCard'
import {REQUEST} from '../api'
import {Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button} from '@material-ui/core'

/** The requests screen show all the requests made by the user
 * @constructor
 */    

function Requests(){
    const [requests,SetRequests] = useState(null)
    const [open,SetOpen] = useState(false)
    const {user} = useAppContext()

    useEffect(() =>{
        const getRequests = async () =>{
            await REQUEST().then(res => SetRequests(res.requests))
        }

        getRequests()

    },[])

    const RequestFail = () =>{
        return (
            <Dialog open={!open} >
              <DialogTitle className="profile-card-header">
                 Aconteceu alguma coisa!
             </DialogTitle>
             <DialogContent>
                 os pedidos de troca não foram localizados,
                ou você não possui pedidos de troca!
                volte a tela inicial ou tente novamente.
            </DialogContent>
                <DialogActions>
                    <Button href="/dashboard">Voltar</Button>
                </DialogActions>
                    
            </Dialog>
        )
    }

    const RequestsList = () =>{

        return(
            <div>
                {requests.length > 0 ?
                requests.map(request =>
                    <RequestCard key={request.id} request={request}/>)
                : <RequestFail open={open}/>}
            </div>
        )
    }


    return (
        <div>
            <TopBar user={user}/>
            {requests ? <RequestsList/> : ""}

        </div>
    )
}

export default Requests