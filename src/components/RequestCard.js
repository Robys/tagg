import { useEffect,useState } from 'react';
import { useAppContext } from '../utils/UserContext'
import {Card,
    CardContent,
    CardMedia,
    CardHeader,
    CardActions
} from '@material-ui/core';
import RequestOptions from './RequestOptions';

/** These card show all the information of the request made by the user
 * 
 * @param {Object} request - request made by the user
 */

const RequestCard = ({request}) => {
    const [isCurrentUser,SetIsCurrentUser] = useState()
    const {user} = useAppContext()
    
    useEffect(()=>{
        SetIsCurrentUser(user.id === request.selected.owner.id ? true : false)

    },[request,user])


    return (
        <div>
            <Card className="request-card">
            <CardMedia
            className="request-card-media"
         image={request.selected.cover}
         title={request.selected.title}
         />

     <CardHeader title={request.selected.title}
     className="profile-card-header"/>
         
    <CardContent className="request-card-content">

         <p>id da troca : {request.id}</p>
         <p>status: {request.status}</p>
         <strong>para: {request.selected.platform} </strong>
         
         <div>
             pertence a: <a href={`/profile/${request.selected.owner.id}`}>{request.selected.owner.firstName}</a>
         </div>
         <p>valor: {request.selected.value}</p>
         <div>trocando por : <a href={`/details/${request.requested.id}`}> 
             {request.requested.title} 
             </a> 
        </div>
         
         <div>
             pedido feito por: <a href={`/profile/${request.requested.owner.id}`}>{request.requested.owner.firstName}</a>
         </div>

     </CardContent>

     <CardActions>
         {isCurrentUser? 
         <RequestOptions request={request}/>
         
         :""}
     </CardActions>

            </Card>

        </div>


    )

}

export default RequestCard