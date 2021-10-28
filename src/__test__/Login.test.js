import React from "react";
import Login from '../views/Login'
import {shallow} from '../enzyme'


describe('rendering <Login/>', () =>{
    
    const email = "adm@tagg.com"
    const password = "123456"

    const container = shallow(<Login email={email} password={password} />)
    const handleSubmit = jest.fn(() => console.log("mock called"));

    test('rendering HTML without crashing',()=>{
        expect(container).toMatchSnapshot()
    })
        
    it('testing email input',()=>{
        //find email input in the login component and simulate typing
        const input = container.find('input[type="text"]')
        //compare input with expected value
        expect(input.props().value).toEqual(email)
    })

    it('testing password input',()=>{
        //find password input in the login component and simulate typing
        const input = container.find('input[type="password"]')
        //compare input with expected value
        expect(input.props().value).toEqual(password)
    })

    it('test submit function', ()=>{
        const wrapper = shallow(<Login handleSubmit={handleSubmit} />)
        wrapper.find('#submit').simulate('click')
        wrapper.update()
        expect(handleSubmit).toBeCalled();
    })

})


