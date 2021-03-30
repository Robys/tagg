/** importando dependencias **/
import React from 'react'
import {waitFor,render} from '@testing-library/react' 
import {MockedProvider} from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect';
import {GetGameTest,GET_GAME} from './GetGameTest'

/* id de um jogo qualquer */
const gameId = "605f6dfd7d1c8c19247d8378"


const mock = [{
    request:{
        query:GET_GAME,
        variables:{_id:gameId}
    },
    result:{
        data: {
            game: {
              id: "605f6dfd7d1c8c19247d8378",
              title: "Doom",
              description: "somente troca"
            }
          }
      }
}]


describe('testing get game query', ()=>{
    
    test('match with snapshot',async ()=>{
           const root = render(
                <MockedProvider mocks={mock} addTypename={false}>
                    <GetGameTest id={gameId}/>
                </MockedProvider>
            )


            await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    
        expect(root).toMatchSnapshot();
    })


})





