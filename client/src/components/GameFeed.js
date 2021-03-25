import {useState} from 'react'
import GameFeedContainer from './GameFeedContainer'
import {InputGroup,FormControl,Button, Card, Media} from 'react-bootstrap'
import ScrollArea from '@xico2k/react-scroll-area';
import {FindGames} from '../utils/utils'
import {FilterGames} from '../utils/Filters'
export default function GameFeed(){
    const data = FindGames()
    const [keyword,setKeyWord] = useState()
    const [result,setResult] = useState()

    const SortArray = array => {
        const sortProperty = 'createdAt';
        const sorted = Object.values(array).sort((a,b)=>b[sortProperty] - a[sortProperty])
        return sorted.map(game => <GameFeedContainer game={game} key={game.id}/>)

    }

    const OnSearchButton = e =>{
        e.preventDefault()
        const results = FilterGames(data,keyword)
        setResult(results)
    }

        return(
            <Media>
            <Card className="game-feed">
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
            
                
            <Card.Body style={{height:"548px"}}>
            <ScrollArea height="100%">

                {result
                ?<div>
                    <h4>Resultado da pesquisa</h4>
                    {result.map( game => <GameFeedContainer game={game} key={game.id}/> )}

                    <hr/>
                    
                </div>
            :data
            ?
            <div>
                {Object.values(data).map(values => 
                    SortArray(values) )}
            </div> 
                :""}
                
                </ScrollArea>
            </Card.Body>

            </Card>

            </Media>
            
            )
            
        }
        
        
        /**
         * <GameFeedContainer game={game} key={game.id}/>
         * 
         * 
         * 
         * 
            {posts? 
            <div> {posts.map(game => <GameFeedContainer game={game} key={game.id}/>)}
            <Pagination postPerPage={postPerPage} totalPosts={posts.lenght}/> 
            </div>: "" }
         <Pagination postPerPage={postPerPage} totalPosts={Object.values(slice).length}/>
         * 
 * {data? .map(value => value.map(game => <GameFeedContainer game={game} key={game.id}/>)) : ""}
 */