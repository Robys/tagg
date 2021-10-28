import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Paper,Button,CardHeader} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import {LOGIN} from '../api'
import {Footer} from '../utils/SiteContent'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

/** Login screen provide the access to the dashboard (main screen of the application)
 * @constructor
 * @param {string} email - users email
 * @param {string} password - users password
 */

function Login (props){

    const [email,SetEmail] = useState()
    const [password,SetPassword] = useState()

    const [error,SetError] = useState({onError:false,message:''}) 
    const [ready,SetReady] = useState(false)

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        SetReady(false);
        SetError({onError:false,message:''});
      };
    
    
    const Styles = {

        LoginPaper:{
            margin:"0 auto",
            marginTop:"40px",
            marginBottom:"40px",
            maxWidth:"420px",
            height:"320px"
        },

        LoginForm:{
            padding:"20px"
        },
        
        InputItem : {
            margin:"10px" 
        },
    }

    const handleSubmit = async (e) =>{

        e.preventDefault()
        const res = await LOGIN(email,password)
            //console.log(res)
            if(res.data.data.login!==null){
                
                SetReady(true)
            }
            else if(res.data.data.errors!==null){
                const err = res.data.errors
                err.map(item => {
                    return SetError({onError:true,message:item.message})
                    
                })
            }
    }

    return (
        <div>
        <Paper style={Styles.LoginPaper}>
            {props.handleSubmit ?props.handleSubmit():""}
            <CardHeader title="Login" className="addgame-card-header"/>

            <form onSubmit={handleSubmit}
            style={Styles.LoginForm}>
                <input 
                id="email"
                type="text" 
                name="email"
                value={props.email}
                style={Styles.InputItem}  
                onChange={e=>SetEmail(e.target.value)} />

                <input 
                id="password"
                type="password" 
                name="password"
                value={props.password}
                style={Styles.InputItem} 
                onChange={e=>SetPassword(e.target.value)}/>

                <Button type="submit" id="submit"
                variant="contained" color="primary" style={Styles.InputItem} >
                    Enter
                </Button>

            {error.onError ?
            <Alert onClose={handleCloseAlert} severity="error">
              {error.message}
            </Alert>

          :""}

            </form>

            {ready === true ? 
            <Redirect to="/processlogin"/>
            :""}


        </Paper>
        
        <Footer/>

        </div>
    
    
    )
}

export default Login