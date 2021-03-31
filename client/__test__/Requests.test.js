/** importando dependencias **/
import React from 'react'
import {MockedProvider} from '@apollo/react-testing'
import {waitFor,render} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect';
import Requests from '../src/views/Requests'

/* Este teste consiste em certificar 
que as trocas sejam requisitada e que se seu resultado for nulo
não quebre a aplcação */
test('get users games / user collection',async ()=>{
    const container = render (
        <MockedProvider mocks={[]}>
            <Requests/>
        </MockedProvider>
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    expect(container).toMatchSnapshot();
})

