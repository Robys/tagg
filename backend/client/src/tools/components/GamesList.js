import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {GET_GAMES} from '../../api/queries'
import GamesTable  from '../tables/GamesTable'
import {
    InputGroup, 
    FormControl,
    Button} 
from 'react-bootstrap'


export default function GamesList(){
    const [keyword,SetKeyword] = useState()
    //const [results, SetResults] = useState()
    const {data,loading,error} = useQuery(GET_GAMES)

    const searchUser = keyword =>{
        //const response = filterUser(data,keyword)
        //SetResults(response)
        
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

            { data? <GamesTable list={data}/> 
            : "nenhum usuário encontrado"}

        </div>
    )
}