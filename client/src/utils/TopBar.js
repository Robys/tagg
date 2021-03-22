import {Navbar,NavLink,Nav,Image} from 'react-bootstrap'
import {Logout} from './Logout'
import {FindCurrent} from './utils'
import logo from '../imgs/tagg-logo-orange.png'

export default function TopBar(){
    const user = FindCurrent()
    //console.log(user)

    return(
        <Navbar className="nav-bar" expand="lg" variant="dark">
        <Navbar.Brand>
            <Image src={logo} alt="tagg"/>
        </Navbar.Brand>
        {user?
        <Nav>

        <Nav >
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

    )

}