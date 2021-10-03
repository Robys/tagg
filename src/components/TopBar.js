import { useState } from "react";
import {LOGOUT} from '../api'
import {AppBar,
    Button,
    List,
    ListItem,
    ListItemText,
    Toolbar, 
    IconButton, 
    Drawer} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

/** The TopBar is placed in the top of the application, providing a menu
 * for the user to access other pages as the profile, contacts, etc.
 * 
 * @param {Object} user - logged user detected by the system
 */

function TopBar({user}){
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
   

    return (
        <AppBar position="static" style={{backgroundColor:"#FD507A"}}>
            <Toolbar>
                <IconButton edge="start" 
                color="inherit" aria-label="menu" onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {user ? 
            <Drawer anchor="left" open={anchorEl} onClose={handleClose}>
            <List>
                <ListItem>
                    <ListItemText primary={<a href="/dashboard">Home</a>} />
                </ListItem>
            
                <ListItem>
                    <ListItemText primary={<a href="/notifications">Notificações</a>} />
                </ListItem>

                <ListItem>
                    <ListItemText primary={<a href="/requests">Trocas</a>} />
                </ListItem>

                <ListItem>
                    <ListItemText primary={<a href="/contacts">Contatos</a>} />
                </ListItem>

                <ListItem>
                    <ListItemText primary={
                    <a href={`/profile/${user.id}`}>{user.firstName}</a>
                    } />
                </ListItem>
                {user.roles !== "USER" ?
                <ListItem>
                    <ListItemText primary={<a href="/tools"> Ferramentas </a> } />
                </ListItem>
                : ""}
        
                <ListItem onClick={e => {LOGOUT()}}>
                <Button href="/"
                variant="contained" color="secondary">
                    Sair
                </Button>
                    
                </ListItem>
            </List>
            </Drawer>
            : ""}
        </AppBar>
        
    )
}

export default TopBar