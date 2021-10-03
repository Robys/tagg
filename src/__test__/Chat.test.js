import React from 'react'
import {act} from 'react-dom/test-utils'
import {shallow} from '../enzyme'
import Chat from '../components/Chat'

const sender = {
    id:"60edb9b0b291b127e48a8778",
}

const receiver = {
    id:"60f051ab648d18294c24c343",
}


const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

describe("testing <Chat/>",()=>{

    test("fetching messages", async ()=>{
        const container = shallow(<Chat sender={sender} receiver={receiver}/>)
        //expect(container.exists("#message")).toBe(false)
        await whenStable()
        expect(container.find("#message")).toBeTruthy()
        expect(container).toMatchSnapshot()

    })

})