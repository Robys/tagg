/** importando dependencias **/
import React from 'react'
import {MockedProvider} from '@apollo/react-testing'
import {waitFor,render,screen} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect';
import Collection from '../src/components/Collection'
import {GET_COLECTION} from '../src/api/queries'

/** id de usuário para a pesquisa */
const userId = "605f6cf77d1c8c19247d8374"

const mock = [{
    request:{
        query:GET_COLECTION,
        variables:{_id:userId}
    },
    result : jest.fn(()=>({
        data: {
            colection: [
                {
                  id: "605f6d417d1c8c19247d8375",
                  title: "mad max",
                  owner: "605f6cf77d1c8c19247d8374",
                  location: "São Paulo",
                  status: "Usado",
                  value: "",
                  publisher: "Other",
                  platform: "PC",
                  description: "procuro jogo de luta ou  aventura",
                  cover: {
                    filename: "mad max",
                    path: "https://res.cloudinary.com/dahwijw8w/image/upload/v1616866624/robert_crud_test/iyqagjhp0mcjxhvycyjg.jpg"
                  }
                },
                {
                  id: "605f6d737d1c8c19247d8376",
                  title: "the surge",
                  owner: "605f6cf77d1c8c19247d8374",
                  location: "São Paulo",
                  status: "Usado",
                  value: "40",
                  publisher: "Other",
                  platform: "Playstation",
                  description: "troco ou vendo",
                  cover: {
                    filename: "the surge",
                    path: "https://res.cloudinary.com/dahwijw8w/image/upload/v1616866674/robert_crud_test/hltz1qvtbm75bhaoknh0.jpg"
                  }
                }
              ]
          }
    }))
  }]


/* este teste consiste em verificar 
se a coleção seja requisitada e tenha seja mostrada na tela */
test('get users games / user collection',async ()=>{

    const container = render(
        <MockedProvider mocks={mock} addTypename={false}>
            <Collection user={userId}/>
        </MockedProvider>
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    const ndata = await screen.queryByTestId('ndata')
    expect(ndata).toMatchSnapshot();
})

/**
 * colection: [
                {
                  id: "605f6d417d1c8c19247d8375",
                  title: "mad max",
                  owner: "605f6cf77d1c8c19247d8374",
                  location: "São Paulo",
                  status: "Usado",
                  value: "",
                  publisher: "Other",
                  platform: "PC",
                  description: "procuro jogo de luta ou  aventura",
                  cover: {
                    filename: "mad max",
                    path: "https://res.cloudinary.com/dahwijw8w/image/upload/v1616866624/robert_crud_test/iyqagjhp0mcjxhvycyjg.jpg"
                  }
                },
                {
                  id: "605f6d737d1c8c19247d8376",
                  title: "the surge",
                  owner: "605f6cf77d1c8c19247d8374",
                  location: "São Paulo",
                  status: "Usado",
                  value: "40",
                  publisher: "Other",
                  platform: "Playstation",
                  description: "troco ou vendo",
                  cover: {
                    filename: "the surge",
                    path: "https://res.cloudinary.com/dahwijw8w/image/upload/v1616866674/robert_crud_test/hltz1qvtbm75bhaoknh0.jpg"
                  }
                }
              ]
 */