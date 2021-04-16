/**
 * Tela de perfíl do usuário
 * **/

import React from 'react'
import {Card} from 'react-bootstrap'
import {FindCurrent,FindUser} from '../utils/utils'
import AddGame from '../components/AddGame'
import Collection from '../components/Collection'
import generic from '../imgs/user.png'

import TopBar from '../utils/TopBar'

export default function Profile (props){
    const data = FindUser(props.match.params.id)
    const current = FindCurrent()
    
    return(
        <div>

            <TopBar/>

            <Card className="profile">
                   {data.picture===""
                   ?
                    <Card.Img src={generic}/>
                   : <Card.Img  src={data.picture} className="user-picture"/> }

                    <Card.Body className="profile-info">
                                <h3>{data.firstName} {data.lastName}</h3>
                                 <p>{data.email}</p>
                             <p>de: {data.location}</p>
                             <p>criado: {data.createdAt}</p>

                    {current.id === data.id
                    ? <a href="/userSettings"> alterar perfil </a> : ""}

                    </Card.Body>
                </Card>
                
                <AddGame current={data.id}/> 

                <Collection user={data.id}/>
               
        </div>
    )
}

