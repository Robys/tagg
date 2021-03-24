import {useState} from 'react'
import {InputGroup,FormControl,Button, Card} from 'react-bootstrap'
import ScrollArea from '@xico2k/react-scroll-area';
import GameFeed from '../components/GameFeed'
import MyNotifications from '../components/MyNotifications'
import {FindCurrent,FindGames} from '../utils/utils'
import {FilterGames} from '../utils/Filters'

export default function Dashboard(){
    const current = FindCurrent()
    const data = FindGames()
    const [keyword,setKeyWord] = useState()
    const [result,setResult] = useState()

    const OnSearchButton = e =>{
        e.preventDefault()
        const results = FilterGames(data,keyword)
        setResult(results)
    }

    return(
        <div>
            {current? <MyNotifications user={current}/> : "" }

            <Card className="dashboard">
                <Card.Header>

            <InputGroup className="mb-3">
                <FormControl
                placeholder="Procure aqui"
                aria-label="barra de pesquisa"
                aria-describedby="basic-addon2"
                onChange={e => setKeyWord(e.target.value)}
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={e => OnSearchButton(e)}>Procurar</Button>
                </InputGroup.Append>
            </InputGroup>

                </Card.Header>
            
            <Card.Body style={{height:"368px"}}>
            <ScrollArea height="100%">

                <GameFeed data={data} result={result}/>
                </ScrollArea>
            </Card.Body>
            </Card>

            </div>

    )
}
