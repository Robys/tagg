import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {ALL_REQUESTS} from '../../api/queries'
import {FilterRequests} from '../../utils/Filters'
import RequestTable from '../tables/RequestTable'
import {
    InputGroup, 
    FormControl,
    Alert,
    Button} 
from 'react-bootstrap'


export default function RequestsList(){
    const [keyword,SetKeyword] = useState()
    const [results, SetResults] = useState()
    const [show, setShow] = useState(true)
    const {data,loading,error} = useQuery(ALL_REQUESTS)

    const searchUser = keyword =>{
        const response = FilterRequests(data,keyword)
        SetResults(response)
        
    }

    return(
        <div className="users-list">
            {loading? "loading ...":""}
            {error ? <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                        <p>{error.message}</p>
                    </Alert>  : ""}

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
                <RequestTable list={results}/>
            : data? <RequestTable list={data.allRequests}/> 
            : "nenhuma requisição de troca encontrada"}

        </div>
    )
}