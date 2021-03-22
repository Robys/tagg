import GameFeedContainer from './GameFeedContainer'

export default function GameFeed({data,result}){

    const SortArray = array => {
        const sortProperty = 'createdAt';
        const sorted = Object.values(array).sort((a,b)=>b[sortProperty] - a[sortProperty])
        return sorted.map(game => <GameFeedContainer game={game} key={game.id}/>)

    }

        return(
            <div>
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

            </div>
            
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