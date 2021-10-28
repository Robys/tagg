import React from 'react'
import {shallow,mount} from '../enzyme'
import AddGame from '../components/AddGame'


const testUser = {
    id:"60edb9b0b291b127e48a8778",
    firstName:"Cleiton",
    lastName:"da Silva",
    email:"cleiton@test.com",
    password:"123456",
    picture:null,
    local:"Recife"
}

const gameTest = {
    user:testUser,
    title:"test title",
    gender:"Aventura",
    price:"",
    videogame:"Playstation",
    description:"test",
    status:"Usado",
    cover:""

}

describe('testing <AddGame/>',()=>{

    
    test('testing proper rendering',() =>{
        const container = shallow(<AddGame/>)
        expect(container).toMatchSnapshot()
    })

    test("test submit button",()=>{
        var container = mount(<AddGame />, {context:testUser});
        container.find({"datatest-id":"submit"}).simulate('click',gameTest)

    })

})
