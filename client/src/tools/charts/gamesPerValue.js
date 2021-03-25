import {useQuery} from '@apollo/react-hooks'
import {GET_METRICS} from '../../api/queries'
import {Card} from 'react-bootstrap'
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

export default function GamesPerVelue (){
    const {data,loading,error} = useQuery(GET_METRICS, {variables: {keyword:"values"} })

    return (
        <Card className="metric-card">
        <Card.Header>
        Neste gráfico é apresentado os jogos com maior valor, 
         no caso do usuário desejar vender ou negociar com base nesse valor
        </Card.Header>
        <Card.Body>
            {loading? <p>carregando</p>: ""}
            {error? <p>{error.message}</p>:""}
            {data? Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
                <VictoryBar data={res} x="title" y="value" style={{ data: { fill: "#c43a31" } }}/>
            </VictoryChart>
            ): ""}
        </Card.Body>


    </Card>
    )
    
}