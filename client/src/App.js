import React from 'react'

import {BrowserRouter,Route} from 'react-router-dom'
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Profile from './views/Profile'
import GameDetails from './views/GameDetails'
import Tools from './views/Tools'
import ProcessRequest from './views/ProcessRequest'
import DeleteGame from './views/DeleteGame'
import UserSettings from './views/UserSettings'
import GameSettings from './views/GameSettings'
import Requests from './views/Requests'
import MailBox from './views/MailBox'
import Notifications from './views/Notifications'
import Contacts from './views/Contacts'
import ProcessUserSettings from './views/ProcessUserSettings'
import ProcessGameSettings from './views/ProcessGameSettings'

function App() {

  return (
    <div className="App">
       <BrowserRouter>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route exact path="/tools/:id" component={Tools}/>
    <Route exact path="/profile/:id" component={Profile}/>
    <Route exact path="/userSettings/" component={UserSettings}/>
    <Route exact path="/gameSettings/:id" component={GameSettings}/>
    <Route exact path="/details/:id" component={GameDetails}/>
    <Route exact path="/requests" component={Requests}/>
    <Route exact path="/contacts" component={Contacts}/>
    <Route exact path="/mailbox" component={MailBox}/>
    <Route exact path="/notifications" component={Notifications}/>
    <Route exact path="/processuser" component={ProcessUserSettings}/>
    <Route exact path="/processgame" component={ProcessGameSettings}/>
    <Route exact path="/deleteGame/:id" component={DeleteGame}/>
    <Route exact path="/processrequest" component={ProcessRequest}/>
    
    </BrowserRouter>

    </div>
   
  );
}

export default App;

