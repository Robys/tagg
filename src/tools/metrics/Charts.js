import {Card,CardHeader,CardContent,Typography} from "@material-ui/core"
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

/** 
 * A chart showing the amount of accounts created in a certain region.
 * In these case, the x axis is the locations name, and the y axis
 * is the number of users in that place.
 * 
 * @param {Object} data - received information from API. 
*/

 const UserLocationChart = (data)=>{

    //const mediaMatch = useMediaQuery('(max-width: 480px)');
    //style={{height:"720px",width:"100%"}}

    return (

        <Card  style={{height:"720px",width:"100%"}}>

            <CardHeader title={"usuários por região"}/>

            <CardContent>
                {Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
               <VictoryBar data={res} x="location" y="users" style={{ data: { fill: "#c43a31" } }}/>
           </VictoryChart> )}

                <Typography  variant="body2" color="textSecondary" component="p">
                    Este gráfico informa o número de usuários criados em determinada região
                </Typography>
            </CardContent>

        </Card>
    )

}

/** 
 * A chart showing the platform/video games more used by the users
 * In these case, the x axis is the console name, and the y axis
 * is the number of games of that specific platform.
 * 
 * @param {Object} data - received information from API. 
*/

 const PlataformChart = (data)=>{

    //console.log(data)

    return (
        <Card style={{height:"720px",width:"100%"}}>
            <CardHeader title={"Plataformas/Consoles mais usados"}/>

            <CardContent>
                {Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
               <VictoryBar data={res} x="platform" y="games" style={{ data: { fill: "#c43a31" } }}/>
           </VictoryChart>

                )}

                <Typography  variant="body2" color="textSecondary" component="p">
                    Este gráfico mostra as plataformas/consoles mais usados 
                    pelos usuários
                </Typography>
            </CardContent>

        </Card>
    )

}

/**
 * A chart showing the more expensive games
 * 
 * @param {Object} data - received information from API.
 */

 const GameValueChart = (data)=>{

    //console.log(data)

    return (
        <Card style={{height:"720px",width:"100%"}}>
            <CardHeader title={"Jogos mais caros"}/>

            <CardContent>
                {Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
               <VictoryBar data={res} x="title" y="value" style={{ data: { fill: "#c43a31" } }}/>
           </VictoryChart>

                )}

                <Typography  variant="body2" color="textSecondary" component="p">
                    Este gráfico mostra o valor que os usuários estão escolhendo para
                    os jogos que querem vender/negociar.
                </Typography>
            </CardContent>

        </Card>
    )

}

/** These chart display the number of requests created per day
 * 
 * @param {Object} data - received information from API.
 */
 const RequestsChart = (data)=>{

    //console.log(data)

    return (
        <Card style={{height:"720px",width:"100%"}}>
            <CardHeader title={"Pedidos de troca"}/>

            <CardContent>
                {Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
               <VictoryBar data={res} x="createdAt" y="requests" style={{ data: { fill: "#c43a31" } }}/>
           </VictoryChart>

                )}

                <Typography  variant="body2" color="textSecondary" component="p">
                    Este gráfico informa o número de pedidos de trocas
                </Typography>
            </CardContent>

        </Card>
    )

}

/** These chart display the number of accounts created per day
 * 
 * @param {Object} data - received information from API.
 */

 const AccountsChart = (data)=>{

    //console.log(data)

    return (
        <Card style={{height:"720px",width:"100%"}}>
            <CardHeader title={"Contas criadas por dia"}/>

            <CardContent>
                {Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
               <VictoryBar data={res} x="createdAt" y="users" style={{ data: { fill: "#c43a31" } }}/>
           </VictoryChart>

                )}

                <Typography  variant="body2" color="textSecondary" component="p">
                    Este gráfico mostra o número de novas contas por dia
                </Typography>
            </CardContent>

        </Card>
    )

}
export {UserLocationChart,PlataformChart,GameValueChart,RequestsChart,AccountsChart}
