import {useQuery} from '@apollo/react-hooks'
import {GET_METRICS} from '../../api/queries'
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

export default function GamesPerPlatform (){
    const {data,loading,error} = useQuery(GET_METRICS, {variables: {keyword:"platform"} })

    return (
    <div>
        <div style={{margin:"20px"}}>
            <p>Este gráfico apontará o aumento ou queda no numero de contas criadas por dia</p>

        </div>
        <div style={{margin:"20px", height:"400px", width: "600px", float:"left"}}>
            {loading? <p>carregando</p>: ""}
            {error? <p>{error.message}</p>:""}
            {data? Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={10} key={res}>
                <VictoryBar data={res} x="platform" y="games" style={{ data: { fill: "#c43a31" } }}/>
            </VictoryChart>
            ): ""}
 
        </div>


    </div>
    );
    
}