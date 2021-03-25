import React from 'react'
import {Tabs,Tab} from 'react-bootstrap'
import {useQuery} from '@apollo/react-hooks'
import {GET_USER} from '../api/queries'
import Notifications from '../components/Notifications'
import MetricCharts from '../tools/components/MetricCharts'
import UsersList from '../tools/components/UsersList'
import RequestsList from '../tools/components/RequestsList'
import GamesList from '../tools/components/GamesList'

import TopBar from '../utils/TopBar'

export default function Tools(props){
    const {data,loading,error} = useQuery(GET_USER, { variables:{ _id: props.match.params.id} })

    if(loading) {return <p>Loading ...</p>}
    if(error) {return <p>Ops... {JSON.stringify(error)}</p>}

    return(
        <div>
             <TopBar/>

            <Notifications id={data.user.id}/>

            <Tabs defaultActiveKey="users" transition={false} className="tool-tabs">
                <Tab eventKey="users" title="usuários">
                    <UsersList/>
                </Tab>
                <Tab eventKey="games" title="jogos">
                    <GamesList/>
                </Tab>
                <Tab eventKey="requests" title="trocas">
                    <RequestsList/>
                </Tab>
                <Tab eventKey="metrics" title="metricas">
                    <MetricCharts/>
                </Tab>
                
            </Tabs>


        </div>
    )
}