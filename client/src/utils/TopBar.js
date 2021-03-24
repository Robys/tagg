import {useState} from 'react'
import {Navbar,NavLink,Nav,Image} from 'react-bootstrap'
import {FindCurrent} from './utils'
import {Logout} from './Logout'
import logo from '../imgs/icons/tagg-logo-orange.png'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

export default function TopBar(){
    const user = FindCurrent()
    const [show,setShow] = useState(false)
    
    const toggle = () =>  setShow(!show)
    
    return(
        <div className="nav-bar">
            {user 
            ?
            <Nav>
                <Icon path={mdiMenu} size="32px" 
                className="nav-bar-icon" onClick={e=>{
                toggle()
                }}/>

                <Nav style={{float:"right", position:"absolute", left:"85%"}}>

                <NavLink href={`/profile/${user.id}`}>
                    {user.firstName}
                </NavLink>
                <Logout/>

                </Nav>

            </Nav>
            
            : <img src={logo} alt="logo-tagg" href="/"/> }

            {show
            ?
            <div className="side-menu">
                <Nav className="flex-column side-menu-content">
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