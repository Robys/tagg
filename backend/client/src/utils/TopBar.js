/**
 * Barra no topo da tela, contém o menu
 * de navegação, ela também omite 
 * opições que não podem ser acessadas pelos
 * usuários comuns
 * **/

import React from 'react'
import { FindCurrent } from "./utils";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Logout } from "./Logout";

export default function TopBar() {
  const user = FindCurrent()
  console.log(user)
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
              {user !== undefined ?
              <div>

                {user.roles === "ADMIN" || user.roles === "MENAGER" ? (
                  <NavLink href={`/tools/${user.id}`}>ADMIN</NavLink>
                ) : (
                  ""
                )}
                <NavLink href={`/profile/${user.id}`}>{user.firstName}</NavLink>

              </div>

              :""}


            </Nav>
          </Nav>
        </Navbar.Collapse>
              <Logout />
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
