import { useEffect,useState } from "react"
import { SEARCHGAME } from "../api"
import  {GameCard}  from './GameCard'
import {Card,
    Paper,
    InputBase,
    IconButton,
    List,
    ListItem} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Skeleton} from '@material-ui/lab'

export default function GamesList(){
    const [games,SetGames] = useState()
    const [keyword,SetKeyword] = useState()
    
    useEffect(()=>{
        const getGames = async () =>{
            const response = await SEARCHGAME(null,null,null)
            SetGames(response)
        }
        getGames()
    },[])

    const handleSearhGame = async e =>{
        e.preventDefault()
        const response = await SEARCHGAME(keyword)
        SetGames(response)
    }

    return (
        <Card className="game-list-card">
            <Paper component="form" 
            style={{backgroundColor:"#FD507A",color:"white",height:"120px"}}>
            <InputBase
            onChange={e => SetKeyword(e.target.value)}
            className="game-list-input"
            placeholder="Procure aqui"
            inputProps={{ 'aria-label': 'procure aqui' }} />
            
            <IconButton 
            aria-label="search" onClick={handleSearhGame} >
                <SearchIcon />
            </IconButton>

            </Paper>

            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {games !== undefined ? games.map(item =>
                <ListItem key={item.id} id="games-list">
                    <GameCard item={item}/>
                </ListItem> 
                ) : <div>
                <Skeleton variant="rect" height={380} width={380} animation="wave"/>
                <Skeleton variant="text" animation="wave"/>
                
            </div>}

            </List>


        </Card>
    )
}

/**
 *             
 * 
 */