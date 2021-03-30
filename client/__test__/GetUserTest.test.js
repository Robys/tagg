/** importando dependencias **/
import React from 'react'
import {waitFor,render} from '@testing-library/react' 
import {MockedProvider} from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect';
import {GetUserTest,GET_USER} from './GetUserTest'

/* id de um usuário qualquer */
const userid = "605f6611158ad72fc051ac03"


const mock = [{
    request:{
        query:GET_USER,
        variables:{_id:userid}
    },
    result:{
        data: {
          user: {
            id: "605f6611158ad72fc051ac03",
            firstName: "Robert",
            roles:"MENAGER"
          }
        }
      }
}]


describe('testing get user query', ()=>{
    
    test('match with snapshot',async ()=>{
           const root = render(
                <MockedProvider mocks={mock} addTypename={false}>
                    <GetUserTest id={userid}/>
                </MockedProvider>
            )


            await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    
        expect(root).toMatchSnapshot();
    })


})





