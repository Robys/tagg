/** IMPORTANTE
 * 
 * Os contatos nada mais são que os chats no lado do servidor!
 * 
 * **/

import { FindUser, FindCurrent } from "../utils/utils";
import { Image } from "react-bootstrap";

export default function Contact({ info, contact }) {
  var user = "";
  const current = FindCurrent();

  /** verifica quem é o usuário, se ele quem fez o pedido
   * ou se ele que está recebendo, isso evita de ver a si mesmo
   * como um contato **/
  const setUser = () => {
    if (current.id === info.receiver) {
      user = FindUser(info.from);
    } else {
      user = FindUser(info.receiver);
    }
    console.log(info);
  };

  return (
    <div>
      {setUser()}
      {user !== null ? (
        <ul className="contact">
          <li>
            <Image
              roundedCircle
              src={user.picture}
              alt={user.firstName}
              style={{ height: "80px", width: "80px" }}
              onClick={(e) => {
                e.preventDefault();
                contact(info);
              }}
            />
          </li>

          <li>
           <p> 
          {user.firstName} {user.lastName}
          </p> 
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
