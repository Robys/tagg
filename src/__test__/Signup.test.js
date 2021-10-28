import React from 'react'
import {shallow} from '../enzyme'
import Signup from '../components/Signup'


describe('Rendering <Signup/>',()=>{

    const testUser = {
        firstName:"Cleiton",
        lastName:"da Silva",
        email:"cleiton@test.com",
        password:"123456",
        picture:null,
        local:"Recife"
    }

    it('testing submit information', ()=>{
        const container = shallow(<Signup/>)
        const signup = container.find({"datatest-id":"signup"})
        //expect(signup.exists()).toBe(true);
        signup.simulate('click',testUser)

    })

})