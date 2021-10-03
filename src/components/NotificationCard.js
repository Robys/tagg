import {Card,
    Grow,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
    Avatar} from '@material-ui/core'


import {UPDATENOTIFICATION} from '../api'
import RemoveNotificationButton from './RemoveNotificationButton'

/** Card with all the notification information, contain the option to update the
 * notification. 
 * 
 * *item - notification
 * 
 * @param {*} props - props.item.id * 
 */

function NotificationCard (props){

    const HandleUpdateNotify = async () =>{
        const result = await UPDATENOTIFICATION(props.item.id)
        console.log(result)
    }

    return (
        <Grow in={true}>
        <Card style={{marginTop:"10px",width:"340px"}}>
        <CardHeader className="profile-card-header"
        title={`${props.item.sender.firstName} ${props.item.sender.lastName} `}
        subheader={props.item.createdAt}
        avatar={<Avatar area-label="owner-photo" src={props.item.sender.picture}/>}
        action={<RemoveNotificationButton notification={props.item}/>}>
        </CardHeader>
        <CardContent>
            
        <Typography variant="body2" color="textSecondary" component="p">
            {props.item.content}
        </Typography>

        </CardContent>

        <CardActions>
            <Button href="/notifications" onClick={HandleUpdateNotify}>
                marcar como lida
            </Button>
        </CardActions>


        </Card>

        </Grow>
        
    
        )
}

export default NotificationCard