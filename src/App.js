import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Profile from './views/Profile'
import Details from './views/Details'
import NotificationsView from './views/NotificationsView'
import Contacts from './views/Contacts'
import Messages from './views/Messages'
import ProcessRequest from './views/ProcessRequest'
import Requests from './views/Requests'
import Tools from './views/Tools'
import ProcessSignUp from './views/ProcessSignUp'
import ProcessLogin from './views/ProcessLogin'

import {AppContextProvider} from './utils/UserContext'

export default function App (){
  return (
    <BrowserRouter>
    <AppContextProvider>
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/dashboard' component={Dashboard}/>
    <Route path="/profile/:id" component={Profile}/>
    <Route path="/details/:id" component={Details}/>
    <Route path="/notifications" component={NotificationsView}/>
    <Route path="/contacts" component={Contacts}/>
    <Route path="/messages/:id" component={Messages}/>
    <Route path="/processrequest" component={ProcessRequest}/> 
    <Route path="/processlogin" component={ProcessLogin}/> 
    <Route path="/signupprocess" component={ProcessSignUp}/> 
    <Route path="/requests" component={Requests}/> 
    <Route path="/tools" component={Tools}/> 
    </AppContextProvider>
    </BrowserRouter>
    )

}

