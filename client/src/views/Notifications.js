import {FindNotifies} from '../utils/utils'
import NotifyToast from '../components/NotifyToast'
import TopBar from '../utils/TopBar'
import {Spinner,Card,Tabs,Tab,Container} from 'react-bootstrap'

export default function Notifications(){
    const {data,loading,error}  = FindNotifies()


    return(
        <div>
            <TopBar/>
            <Card className="notify-screen">
                <Card.Header>
                    Notificações
                </Card.Header>
                <Card.Body>
            <Tabs defaultActiveKey="new">
                <Tab eventKey="new" title="Novos">
                {data?
                data.notifies.map(item => <NotifyToast item={item} enabled={!item.accepted}/> )  
                : <p>você não possui mensagens</p>}
                </Tab>
                <Tab eventKey="readed" title="Lidos">
                {data?
                 data.notifies.map(item => <NotifyToast item={item} enabled={item.accepted}/> )
                :  <p>você não possui mensagens</p>}
                </Tab>
            </Tabs>

            </Card.Body>
            {loading? <Spinner/> : ""}
            {error? <p>error {error.message}</p>:""}

            </Card>
        </div>
    )
}