import {Card,
    Grow,
    CardContent,
    CardMedia,
    CardHeader,
    Typography,
    CardActions,
    Button
} from '@material-ui/core';

/** These component is a card contains the basic info of a game
 * and a link for more datails
 * 
 * @param {string} title - The title of the game.
 * @param {string} videogame - The platform/videogame from the game.
 * @param {string} status - The physic condition of the game/media.
 * @param {file} cover - A photo or the cover of the game.
 * )
 */

export const GameCard = ({item}) => {

    return (
        <Grow in={true}>
          
            <Card className="game-card">
            <CardMedia
             className="game-card-media"
             image={item.cover}
             title={item.title}
             />
    
         <CardHeader title={item.title} 
         className="game-card-header"/>
    
         <CardContent className="game-card-content">
         <Typography variant="body2" component="p">
                {item.platform}
        </Typography>
         <Typography variant="body2" component="p">
                {item.status}
        </Typography>
    
         <CardActions>
    
            <Button  variant="contained" color="primary" href={`/details/${item.id}`} >
                Detalhes
            </Button>
    
    
         </CardActions>

         </CardContent>
    
    
            </Card>
            

        </Grow>
        
    )
}