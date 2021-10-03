import {Card,
    CardContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Avatar,
    CardHeader
} from '@material-ui/core';

/** The list of the games of the user
 * 
 * @param {Object} collection - list of the games from some user  
 */

function Collection ({collection}){
    const data = collection

    return (
        <div>
            <Card className="collection" variant="outlined">
            <CardHeader title="Coleção" 
               className="profile-card-header"/>
               <CardContent style={{height:"780px"}}>

                  <List>
                      {data[0]!==null ?
                      data.map( item =>
                        <div key={item.id}>

                      <ListItem 
                      alignItems="flex-start">
                           <ListItemAvatar>
                        <Avatar alt={item.title} src={item.cover} variant="rounded" />
                        </ListItemAvatar>
                        <ListItemText
                        primary={
                            <a href={`/details/${item.id}`}>
                                {item.title}
                            </a>}
                        secondary={item.platform}
                        />
                          <Divider variant="inset" component="li" />
                        </ListItem>

                        <Divider variant="inset" component="li" /> 
                        
                        </div>) :
                          "você precisa adicionar jogos a sua coleção" }

                  </List>

                </CardContent> 
            </Card>

        </div>
    )
}

export default Collection