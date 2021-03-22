import {useQuery} from '@apollo/react-hooks'
import {GET_METRICS} from '../../api/queries'
import { VictoryBar, VictoryChart, VictoryTheme  } from 'victory';

export default function UserPerLocation (){
    const {data,loading,error} = useQuery(GET_METRICS, {variables: {keyword:"location"} })
    console.log(data)

    return (
    <div>

        <div style={{margin:"20px"}}>
            <p>Este gráfico informa as regiões com maior número de usuários </p>

        </div>
        <div style={{margin:"20px", height:"400px", width: "600px"}}>
            {loading? <p>carregando</p>: ""}
            {error? <p>{error.message}</p>:""}
            {data? Object.values(data).map(res => 
            <VictoryChart theme={VictoryTheme.material} domainPadding={4} key={res}>
                <VictoryBar data={res} x="location" y="users" style={{ data: { fill: "#c43a31" } }}/>
            </VictoryChart>
            ): ""}
 
        </div>

    </div>
    );
    
}