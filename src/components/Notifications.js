import { useState,useEffect} from 'react'
import { AppBar,Tabs,Tab} from '@material-ui/core';
import {GETNOTIFICATIONS } from '../api'
import {ReadedNotifications,RecentNotifications} from '../components/NotificationTabs'

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

/** List of notifications from a user
 * 
 * @constructor
 * @param {Object} user - logged user detected by the system
 */


const Notifications = ({user}) => {
    const [data,SetData] = useState()

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(()=>{
        const getUserNotifications = async () =>{
            if(user){
                const response = await GETNOTIFICATIONS(user.id)
                SetData(response)
            }
        }

        getUserNotifications()

    },[])

    //console.log(data)

    return (
        <div>
            <AppBar position="static">
            <Tabs 
            style={{backgroundColor:"#FFFF",color:"#232323"}}
            value={value}
            variant="scrollable"
            scrollButtons="auto" 
            onChange={handleChange} >
                <Tab label="Recentes" {...a11yProps(0)} />
                <Tab label="Visualizadas" {...a11yProps(1)} />
            </Tabs>
            </AppBar>

            <RecentNotifications value={value} index={0}>
                {data}
            </RecentNotifications>
            <ReadedNotifications value={value} index={1}>
                {data}
                </ReadedNotifications>
        </div>
    )

}

/**
 * 
 * 
 */


export default Notifications