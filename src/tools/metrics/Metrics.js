import {useState} from 'react';

import {Tab,Tabs} from '@material-ui/core';


import KeywordMetricTab from './KeywordMetricTab'

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  /**
   * Provide a menu to select different types of charts containing different
   * kinds of informations about the application
   * 
   * @param {*} value - Set the selected chart option
   * @param {string} children - string for API search in KeywordMetricTab component
   */

function Metrics(){
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div>
        
        <Tabs
        style={{float:"left"}}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="usuários por região" {...a11yProps(0)} />
          <Tab label="contas criadas por dia" {...a11yProps(1)} />
          <Tab label="consoles mais usuados" {...a11yProps(2)} />
          <Tab label="jogos mais caros" {...a11yProps(3)} />
          <Tab label="pedidos de troca" {...a11yProps(4)} />

        </Tabs>

        <div className="metrics-content">

        <KeywordMetricTab value={value} index={0} children={"location"}/>
        <KeywordMetricTab value={value} index={1} children={"accountsCreated"}/>
        <KeywordMetricTab value={value} index={2} children={"platform"}/>
        <KeywordMetricTab value={value} index={3} children={"value"}/>
        <KeywordMetricTab value={value} index={4} children={"requests"}/>

        </div>

      </div>
    );
}

export default Metrics




