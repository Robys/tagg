/** importando dependencias **/
import React from 'react'
import {waitFor,render,fireEvent} from '@testing-library/react' 
import {MockedProvider} from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect';
import {LOGIN} from '../src/api/mutations'
import {useMutation} from "@apollo/react-hooks"

const info = {email:"william@emil.com",password:"456456"}

const mock = [{
    request:{
        query:LOGIN,
        variables:{email:info.email,password:info.password}
    },
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

const LoginComp = ({email,password}) =>{
  const [login,{data,loading,error}] = useMutation(LOGIN,{variables:{email,password}})
  return (
    <div>
    <button data-testid="login"  onClick={e => login()}>
      Login
    </button>

    {loading? <p>Loading ...</p> :""}
    {error? <p>error {JSON.stringify(error)}</p> : ""}
    {data? <p data-testid="ndata">{JSON.stringify(data)}</p> : ""}
    </div>
  )
}

    test('mutation should call with the button pressed',async ()=>{
      const container = render(
        <MockedProvider mocks={mock} addTypename={false}>
          <LoginComp email={info.email} password={info.password}/>
        </MockedProvider>)
          await waitFor(() => new Promise((res) => setTimeout(res, 0)));
          const btn = await container.findByTestId('login')
          fireEvent.click(btn)
          await waitFor(() => new Promise((res) => setTimeout(res, 0)));
         expect(container).toMatchSnapshot();
    })



/**
 * 
 * describe('testing login mutation', ()=>{
    
    test('mutation should call with the button pressed',async ()=>{
       

           const container = render(
                <MockedProvider mocks={mock} addTypename={false}>
                  <Mutation mutation={LOGIN} variables={{email:"william@emil.com",password:"456456"}}>
                    {(data,loading,error) => {
                      if(loading) return <p>Loading ...</p>
                      if(error) return <p>Err.. {error.message}</p>
                      if(data) return data
                    }}

                  </Mutation>
                  
                </MockedProvider>
            )

         expect(container).toMatchSnapshot();
    })


})
 */


