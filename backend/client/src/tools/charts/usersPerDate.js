import {useQuery} from '@apollo/react-hooks'
import {GET_METRICS} from '../../api/queries'
import {Card} from 'react-bootstrap'
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

export default function UserPerDate (){
    const {data,loading,error} = useQuery(GET_METRICS, {variables: {keyword:"users"} })

    return(
        <Card className="metric-card">
        <Card.Header>
        Este gráfico apontará o aumento ou queda no numero de contas criadas por dia
        </Card.Header>
        <Card.Body>
            {loading? <p>carregando</p>: ""}
            {error? <p>{error.message}</p>:""}
            {data? Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
                <VictoryBar data={res} x="createdAt" y="users" style={{ data: { fill: "#c43a31" } }}/>
            </VictoryChart>
            ): ""}
        </Card.Body>
    
    
    </Card>
    )
    
}