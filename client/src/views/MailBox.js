import ChatScreen from "../components/ChatScreen";
import TopBar from "../utils/TopBar";
import { Button, Jumbotron, Alert } from "react-bootstrap";

export default function MailBox(props) {
  return (
    <div>
      <TopBar />

      {props.location.state !== undefined ? (
        <>
          <ChatScreen
            chatId={props.location.state.chat.id}
            from={props.location.state.chat.from}
            receiver={props.location.state.chat.receiver}
          />
        </>
      ) : (
        <Jumbotron className="mailbox-fail">
            <Alert variant="warning">
                <Alert.Heading> Você precisa selecionar um contato! </Alert.Heading>
                <p>Se estiver tendo problemas você pode nos contatar</p>
              <Button href="/contacts" variant="outline-warning">Selecionar contato</Button>
            </Alert>

        </Jumbotron>
      )}
    </div>
  );
}
