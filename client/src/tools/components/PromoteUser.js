/**
 * IMPORTANTE
 * 
 * opição disponível somente para gerentes (MENAGER)
 * 
 * **/


import {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {PROMOTE_USER} from '../../api/mutations'
import {Form} from 'react-bootstrap'

export default function PromoteUser ({_id}){
    const [PromoteUser] = useMutation(PROMOTE_USER)
    const [error,SetError] = useState()
    //const [ready,SetReady] = useState(false)

    const setNewRole = (e,role)=>{
        e.preventDefault()
        PromoteUser({variables: {_id:_id, roles:role}}).then(({ data }) => {
            console.log(data)
          })
          .catch(error => {
            SetError(error)
          })
    }

    return (
        <Form>
             <div key={`inline-radio`} className="mb-3">
            <Form.Check inline label="USER" type="radio" id={`inline-radio-1`} onClick={e => setNewRole(e,"USER")}/>
            <Form.Check inline label="ADMIN" type="radio" id={`inline-radio-1`} onClick={e => setNewRole(e,"ADMIN")}/>

            {error
            ? error.graphQLErrors.map(({ message }, i) => (
                <p style={{color:"red"}} key={i}>{message}</p>
                ) )

            : ""}

            </div>
        </Form>
        
    )
}