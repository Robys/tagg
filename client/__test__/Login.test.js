/** importando dependencias **/
import React from 'react'
import {waitFor,render,fireEvent} from '@testing-library/react' 
import {MockedProvider} from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect';
import {LOGIN} from '../src/api/mutations'
import Login from '../src/views/Login'

const mock = [{
    request:{
        query:LOGIN,
        variables:{email:"william@emil.com",password:"456456"}
    },
    error: new Error('Something happend'),
    result : jest.fn(()=>({
        data: {
            login: {
              user: {
                id: "605f6cf77d1c8c19247d8374",
                firstName: "William"
              }
            }
          }
    }))
}]


describe('testing login mutation', ()=>{
    
    test('mutation should call with the button pressed',async ()=>{
       

           const container = render(
                <MockedProvider mocks={mock} addTypename={false}>
                   <Login />
                </MockedProvider>
            )

            fireEvent.click(container.getByTestId('login'))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)));
           
             expect(container).toMatchSnapshot();
    })


})





