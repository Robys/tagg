/** importando dependencias **/
import React from 'react'
import {MockedProvider} from '@apollo/react-testing'
import {waitFor,render,screen} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect';
import {GET_GAME} from '../src/api/queries'
import {useQuery} from '@apollo/react-hooks'

// id de um jogo qualquer para fazer o teste
let gameId = '605f6dfd7d1c8c19247d8378'

const mock = [{
  request:{
      query:GET_GAME,
      variables:{_id:gameId}
  },
  result : jest.fn(()=>({
      data: {
        game:{
          id:"605f6dfd7d1c8c19247d8378",
          title:"Doom",
          owner:"605f6611158ad72fc051ac03",
          location:"São Paulo",
          status:"Usado",
          value:"0",
          publisher:"Bethesda",
          platform:"Xbox",
          description:"somente troca",
          cover:{
              filename:"Doom",
              path:"https://res.cloudinary.com/dahwijw8w/image/upload/v1616866813/robert_crud_test/mz94904mkr3nwyrz343w.jpg"
          }
        }

        }
  }))
}]

//componente criado para testar 
//o formato das respostas vindas do servidor
const GetGameComp = ({gameId}) =>{
  const {data,loading,error} = useQuery(GET_GAME,{variables:{_id:gameId}})
  return (
    <div>
      {data? <p data-testid="ndata">{JSON.stringify(data)}</p> : ""}
      {loading? <p>loading...</p> : ""}
      {data? <p>error {JSON.stringify(error)}</p> : ""}
    </div>
  )

}

 //O teste simula uma requisição do sistema fornecendo um id qualquer 

test('get a specific game by id',async ()=>{
      
      const container = render(
        <MockedProvider mocks={mock} addTypename={false}>
          <GetGameComp gameId={gameId} />
        </MockedProvider>
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)));
      const ndata = await screen.queryByTestId('ndata')
      expect(ndata).toMatchSnapshot();

    })




/**
 * game:{
        id:"605f6dfd7d1c8c19247d8378"
        title:"Doom"
        owner:"605f6611158ad72fc051ac03"
        location:"São Paulo"
        status:"Usado"
        value:"0"
        publisher:"Bethesda"
        platform:"Xbox"
        description:"somente troca"
        cover:{
            filename:"Doom"
            path:"https://res.cloudinary.com/dahwijw8w/image/upload/v1616866813/robert_crud_test/mz94904mkr3nwyrz343w.jpg"
        }
      }
 */