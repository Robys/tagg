/** importando dependencias **/
import React from 'react'
import {MockedProvider} from '@apollo/react-testing'
import {waitFor,render} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect';
import Contacts from '../src/views/Contacts'

/* Este teste consiste em certificar 
se os contatos são chamados da forma adequada,
como nao se tem usuário logado, o esperado é que nada
seja mostrado na tela, ou uma mensagem apareça */
test('getting user contacts',async ()=>{
    const container = render (
        <MockedProvider mocks={[]}>
            <Contacts/>
        </MockedProvider>
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    expect(container).toMatchSnapshot();
})

