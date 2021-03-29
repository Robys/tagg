import { Button } from "react-bootstrap";
import { FindCurrent } from "../utils/utils";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CHAT, CREATE_NOTIFY} from "../api/mutations";

export default function CreateChat(props) {
  let receiver = ''
  const [CreateChat] = useMutation(CREATE_CHAT);
  const [createNotify] = useMutation(CREATE_NOTIFY)
  const current = FindCurrent();

  const content = `${current.firstName} ${current.lastName} te adicionou aos contatos`

  const StartChat = () => {
    if (current.id === props.from) {
      receiver = props.receiver;
    } else {
      receiver = props.from;
    }

      CreateChat({ variables: { from: current.id, receiver } })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

        createNotify({
          variables: 
          {_id:current.id,
              receiver:receiver,
              content:content,
              accepted:false}
      })

  };
  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          StartChat();
          
        }}
      >
        Adicionar contato
      </Button>
    </div>
  );
}

/**
 * 
 *  const [receiver,SetReceiver] = useState()
    const [CreateChat] = useMutations(CREATE_CHAT)
    const current = FindCurrent()

    const StartChat = e =>{
        e.preventDefault()
        if(current.id === props.from){
        SetReceiver(props.receiver)
        }
        else{
            SetReceiver(props.from)
        }
        
        CreateChat({variables : {from:current.id, receiver:receiver} }).then(({data}) => {
            console.log(data)
        } ).catch(error => {
            console.log(error)
        })
    }

 * 
 * 
 */
