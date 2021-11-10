import { useState } from 'react'
import {SENDMESSAGE} from '../api'
import {Card,
    CardContent,
    CardActions,
    TextField,
    Button} from '@material-ui/core'

export default function MessageInputBox ({receiver,sender}){
    const [content,SetContent] = useState()

    const HandleSendMessage = async (e) =>{
        //e.preventDefault()
        const response = await SENDMESSAGE(receiver,sender,content)
        SetContent("")
        console.log(response.data)
    }

    return (
        <Card className="message-box-input">
            <CardContent>
            <TextField onChange={e => SetContent(e.target.value)}
            multiline rows={4} defaultValue="" variant="outlined" style={{width:"90%",margin:"10px"}}/>

                <CardActions>
                    <Button variant="contained" color="secondary" onClick={HandleSendMessage}>Enviar</Button>
                </CardActions>

            </CardContent>
        </Card>

    )
}