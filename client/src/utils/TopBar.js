import {useState} from 'react'
import {FindCurrent} from './utils'
import {Navbar,Col,Row,Container,Image,Nav} from 'react-bootstrap'
import {Logout} from './Logout'
import logo from '../imgs/icons/tagg-logo-orange.png'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

export default function TopBar(){
    const user = FindCurrent()
    const [show,setShow] = useState(false)
    
    const toggle = () =>  setShow(!show)
    
    return(
        <div>
        <Navbar className="nav-bar">
            <Container>
            <Row>
                <Col>
                {user ?
                <Icon path={mdiMenu} size={1} onClick={e=>toggle()} color="#EAE6DA"/>
                : 
            <Navbar.Brand>
                <Image src={logo} alt="tagg"/>
            </Navbar.Brand>}
                
                </Col>

            </Row>
            <Row>
                <Col>
                {user?
                <Nav>

                <Nav.Link href={`/profile/${user.id}`}>
                 {user.firstName}
                </Nav.Link>
                <Logout/>
                
                </Nav>

                : ""}
                </Col>
            </Row>
            </Container>
        </Navbar>

        {show
        ?
        <div className="side-menu">
        <Nav className="side-menu-content flex-column ">
        
            <Nav.Link href={`/dashboard`}>
                    Home
                </Nav.Link>

                <Nav.Link href={`/requests`}>
                    Pedidos
                </Nav.Link>

                <Nav.Link href={`/mailbox`}>
                    Mensagens
                </Nav.Link>

            {user.roles === 'ADMIN' || user.roles === 'MENAGER'  ? 
             <Nav.Link href={`/tools/${user.id}`}>
                 ADMIN
             </Nav.Link>:""}
        </Nav>

        </div> 
        
        :""}



        </div>
    )

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