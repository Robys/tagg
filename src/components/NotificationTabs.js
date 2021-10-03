import { Box } from '@material-ui/core';
import NotificationCard from './NotificationCard'


 const ReadedNotifications = (props) => {
    const { children, value, index, ...other } = props;
    //console.log(children)

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children !== undefined ?
            children.notifications.map(item =>
              <div key={item.id}>
                {item.readed===true ? <NotificationCard item={item}/> :""}
              </div>
            )
          : <p style={{color:"#FD507A"}}>"Não há novas notificações"</p>}
          </Box>
        )}
      </div>
    );
  }

 const RecentNotifications = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children !== undefined ?
            children.notifications.map(item => 
              <div key={item.id}>
              {item.readed===false ? <NotificationCard item={item}/> :""}
            </div>
            )
          : <p style={{color:"#FD507A"}}>"Não há novas notificações"</p>}
          </Box>
        )}
      </div>
    );
  }

export {ReadedNotifications,RecentNotifications}