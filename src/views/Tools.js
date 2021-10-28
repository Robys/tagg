import { useState,useEffect} from 'react';
import { useAppContext } from '../utils/UserContext'
import { GETUSERS , GETGAMES , ALLREQUESTS ,REPORTS } from '../api';
import TopBar from '../components/TopBar'
import { AppBar,Tabs,Tab} from '@material-ui/core';
import UsersListTab from '../tools/UsersListTab';
import GamesListTabs from '../tools/GamesListTab';
import RequestsListTab from '../tools/RequestsListTable'
import ReportsListTab from '../tools/ReportsListTab';
import MetricsTab from '../tools/MetricsTab'

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  /** The Tool function provide a environment for administrators
   * and managers to inspect the application tables and metrics
   * 
   * @param {Object} users - list of all users
   * @param {Object} games - list of all games
   * @param {Object} requests - list of all requests
   * @param {Object} reports - list of all reports
   * @param {Object} user - logged user detected by the system 
   * 
   */

function Tools(){
  const [users,SetUsers]=useState()
  const [games,SetGames]=useState()
  const [requests,SetRequests]=useState()
  const [reports,SetReports]=useState()

  const {user} = useAppContext()

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(()=>{
      const getData = async ()=>{
        const userList = await GETUSERS()
        SetUsers(userList.data.data.users)
        const gamesList = await GETGAMES()
        SetGames(gamesList)
        const requestsList = await ALLREQUESTS()
        SetRequests(requestsList.data.data.allRequests)
        const reportsList = await REPORTS()
        SetReports(reportsList.data.data.reports)
      }
      
      getData()

    },[])

    return (
        <div>
            <TopBar user={user}/>

            <AppBar position="static">
            <Tabs 
            style={{backgroundColor:"#FFFF",color:"#232323"}}
            value={value} 
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange} >
                <Tab label="Usuários" {...a11yProps(0)} />
                <Tab label="Jogos" {...a11yProps(1)} />
                <Tab label="Trocas" {...a11yProps(2)} />
                <Tab label="Reports" {...a11yProps(3)} />
                <Tab label="Metricas" {...a11yProps(4)} />
               
            </Tabs>
            </AppBar>

            <UsersListTab value={value} index={0} current={user}>
                {users}
            </UsersListTab>

            <GamesListTabs value={value} index={1}>
                {games}
            </GamesListTabs>
            <RequestsListTab value={value} index={2}>
            {requests}
            </RequestsListTab>

            <ReportsListTab value={value} index={3}>
              {reports}
            </ReportsListTab>

            <MetricsTab value={value} index={4}/>
            

        </div>
    )
}

export default Tools