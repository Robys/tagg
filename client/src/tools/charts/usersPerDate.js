import {useQuery} from '@apollo/react-hooks'
import {GET_METRICS} from '../../api/queries'
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

export default function UserPerDate (){
    const {data,loading,error} = useQuery(GET_METRICS, {variables: {keyword:"users"} })

    return (
    <div>

        <div style={{margin:"20px"}}>
            <p>Este gráfico mostra os consoles com jogos mais cadastrados </p>

        </div>
        <div style={{margin:"20px", height:"400px", width: "600px"}}>
            {loading? <p>carregando</p>: ""}
            {error? <p>{error.message}</p>:""}
            {data? Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
                <VictoryBar data={res} x="createdAt" y="users" style={{ data: { fill: "#c43a31" } }}/>
            </VictoryChart>
            ): ""}
 
        </div>

    </div>
    );
    
}