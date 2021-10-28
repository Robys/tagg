import React from "react";
import {shallow} from '../enzyme'
import TopBar from '../components/TopBar'
import ContactList from '../components/ContactList'
import Notifications from '../components/Notifications'

describe('test context hook',()=>{

    const context = {
        id: "60edb9b0b291b127e48a8778",
        roles: "ADMIN",
        active: true,
        firstName: "Administrador",
        lastName: "-",
        email: "adm@tagg.com",
        location: "São Paulo",
        createdAt: "13/07/2021",
        picture: "undefined",
        gamecollection: [
            {
                id: "610429da8d57550d245bdc34",
                title: "Doom 2016",
                gender: "ação",
                platform: "playstation",
                status: "usado",
                value: "40",
                description: "teste",
                createdAt: "30/07/2021",
                cover: "https://res.cloudinary.com/dahwijw8w/image/upload/v1627662802/Tagg/pgyilwxsji2svlchrres.jpg"
            }
        ],
        contacts: [
            {
                id: "60edbd0ddd108f2380cad3e9",
                active: true,
                firstName: "Penelope",
                lastName: "Lopes",
                email: "pe@email.com",
                location: "São Paulo",
                picture: "https://res.cloudinary.com/dahwijw8w/image/upload/v1626193179/Tagg/jqxlkjzelp8x9byda1yn.jpg"
            },
            {
                id: "60f051ab648d18294c24c343",
                active: true,
                firstName: "William",
                lastName: "Pacifico",
                email: "william@email.com",
                location: "São Paulo",
                picture: "https://res.cloudinary.com/dahwijw8w/image/upload/v1626362293/Tagg/lwlhmp3g9vwq9xxynpia.jpg"
            }
        ]
    }
    
    test('rendering dashboard components with context function', ()=>{
        const container = shallow(
            <div>
                <TopBar user={context}/>
                <ContactList user={context}/>
                <Notifications user={context}/>
            </div>
        )
        expect(container).toMatchSnapshot();
    })


})