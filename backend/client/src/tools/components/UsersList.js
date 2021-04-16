import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {GET_USERS} from '../../api/queries'
import {filterUser} from '../../utils/Filters'
import UserTable from '../tables/UserTable'
import {
    InputGroup, 
    FormControl,
    Button} 
from 'react-bootstrap'


export default function UsersList(){
    const [keyword,SetKeyword] = useState()
    const [results, SetResults] = useState()
    const {data,loading,error} = useQuery(GET_USERS)

    const searchUser = keyword =>{
        const response = filterUser(data,keyword)
        SetResults(response)
        
    }

    return(
        <div className="users-list">
            {loading? "loading ...":""}
            {error ? <p>Ops... {JSON.stringify(error)}</p> : ""}

            <InputGroup className="mb-3 admin-bar">
                <FormControl onChange={e => SetKeyword(e.target.value)}
                placeholder="Procure aqui"
                aria-label="Procure aqui"
                />
                <InputGroup.Append>
                <Button onClick={e => {
                    e.preventDefault()
                    searchUser(keyword)
                }}> Ok </Button>
                </InputGroup.Append>
            </InputGroup>

            {results?
                <UserTable list={results}/>
            : data? <UserTable list={data}/> 
            : "nenhum usuário encontrado"}

        </div>
    )
}