import {useQuery} from '@apollo/react-hooks'
import {GET_METRICS} from '../../api/queries'
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

export default function GamesPerVelue (){
    const {data,loading,error} = useQuery(GET_METRICS, {variables: {keyword:"values"} })

    return (
    <div>
        <div style={{margin:"20px"}}>
            <p>Neste gráfico é apresentado os jogos com maior valor, 
                no caso do usuário desejar vender ou negociar com base nesse valor </p>

        </div>
        <div style={{margin:"20px", height:"400px", width: "600px", float:"left"}}>
            {loading? <p>carregando</p>: ""}
            {error? <p>{error.message}</p>:""}
            {data? Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={1} key={res}>
                <VictoryBar data={res} x="title" y="value" style={{ data: { fill: "#c43a31" } }}/>
            </VictoryChart>
            ): ""}
 
        </div>


    </div>
    );
    
}