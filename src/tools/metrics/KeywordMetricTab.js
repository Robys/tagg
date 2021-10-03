import { useState,useEffect } from 'react';
import {METRICS} from '../../api'
import { UserLocationChart,
    AccountsChart,
    PlataformChart,
    GameValueChart,
    RequestsChart} from './Charts';

/**
 * these funtion receive the values from the Metrics menu 
 * to select the right chart to display.
 * 
 * Use the children/keyword for the API return the chart information 
 * 
 */

function KeywordMetricTab(props) {
    const [metrics,SetMetrics] = useState()
    const {children,value, index, ...other } = props;

    useEffect(()=>{
        const getMetrics = async ()=>{
            const res = await METRICS(children)
            SetMetrics(res.data.data.metrics)
        }

        getMetrics()

    },[children])
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
            <div>
                {children === 'location'? 
                <UserLocationChart data={metrics} />
                
                :""} 
                {children === 'platform'? 
                <PlataformChart data={metrics}/>
                
                :""} 
                {children === 'value'? 
                <GameValueChart data={metrics}/>
                
                :""} 
                {children === 'requests'? 
                <RequestsChart data={metrics}/>
                
                :""} 
                {children === 'accountsCreated'? 
                <AccountsChart data={metrics}/>
                
                :""} 


            </div>

        )}
      </div>
    );
  }

export default KeywordMetricTab

