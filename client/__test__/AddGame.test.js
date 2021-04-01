/** importando dependencias **/
import React from 'react'
import {MockedProvider} from '@apollo/react-testing'
import {waitFor,render,fireEvent,screen} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect';
import {ADD_GAME_T} from '../src/api/mutations'
import {useMutation} from '@apollo/react-hooks'

const mockData = {
    owner:"605f6611158ad72fc051ac03",
    title:"Doom",
    publisher:"Bethesda",
    platform:"Xbox",
    status:"Usado",
    value:0,
    description:"somente troca",
}

const mock = [{
    request:{
        query:ADD_GAME_T,
        variables:{
            owner : mockData.owner,
            title : mockData.title,
            publisher: mockData.publisher,
            platform: mockData.platform,
            status: mockData.status,
            value: mockData.value,
            description: mockData.description}
    },
    result : jest.fn(()=>({
        data: {
            title:"Doom",
            owner:"605f6611158ad72fc051ac03",
            
        }
    }))
  }]

  const AddGameComp = ({mockData}) =>{
      const [addGame,{data,loading,error}] = useMutation(ADD_GAME_T)
      const {owner,
        title,
        publisher,
        platform,
        status,
        value,
        description} = mockData
        
    return (
        <div>
        <button data-testid="send" 
        onClick={e => addGame({variables: {
            owner:owner,
            title:title,
            publisher:publisher,
            platform:platform,
            status:status,
            value:value,
            description:description}}
            )}>
            Send
        </button>
        {loading? <p>Loading ...</p> :""}
        {error? <p>error {JSON.stringify(error)}</p> : ""}
        {data? <p data-testid="ndata">{JSON.stringify(data)}</p> : ""}
        </div>
    )

  }

/* O objetivo deste teste é testar a funcionalidade de adicionar
os jogos - crucial para a aplicação  */
test('getting user contacts',async ()=>{
    const container = render (
        <MockedProvider mocks={mock}>
            <AddGameComp mockData={mockData}/>
        </MockedProvider>
    )
    
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    const btn = await container.findByTestId('send')
    fireEvent.click(btn)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    //const ndata = await screen.queryByTestId('ndata')
    expect(screen.queryByTestId('ndata')).toBeInTheDocument()
    expect(container).toMatchSnapshot();
})

