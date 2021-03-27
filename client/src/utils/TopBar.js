import { FindCurrent } from "./utils";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Logout } from "./Logout";

export default function TopBar() {
  const user = FindCurrent();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink href={`/dashboard`}>Home</NavLink>
            <Nav>

              <NavLink href={`/requests`}>Pedidos</NavLink>

              <NavLink href={`/notifications`}>Notificações</NavLink>

              <NavLink href={`/contacts`}>Contatos</NavLink>

              {user.roles === "ADMIN" || user.roles === "MENAGER" ? (
                <NavLink href={`/tools/${user.id}`}>ADMIN</NavLink>
              ) : (
                ""
              )}
              <NavLink href={`/profile/${user.id}`}>{user.firstName}</NavLink>

              <Logout />
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/**
 * import {Navbar,NavLink,Nav,Image} from 'react-bootstrap'
 * 
 *         <Navbar className="nav-bar" expand="lg" variant="dark">
        <Navbar.Brand onClick={e => setShow('inline-block')}>
            <Image src={logo} alt="tagg"/>
        </Navbar.Brand>
        {user!==null?
            <Nav>
                 <Nav style={{display:`${show}`}}>
                <NavLink href={`/dashboard`}>
                    Home
                </NavLink>

                <NavLink href={`/requests`}>
                    Pedidos
                </NavLink>

                <NavLink href={`/mailbox`}>
                    Mensagens
                </NavLink>

            {user.roles === 'ADMIN' || user.roles === 'MENAGER'  ? 
             <NavLink href={`/tools/${user.id}`}>
                 ADMIN
             </NavLink> :""} 
                    
                
            </Nav>
            <Nav>

            <NavLink href={`/profile/${user.id}`}>
                 {user.firstName}
             </NavLink>
            <Logout/>

            </Nav>

             </Nav>
             : ""}       

        </Navbar>
 */
