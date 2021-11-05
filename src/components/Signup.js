import {useState} from 'react'
import {SIGNUP} from '../api'
import ProcessSignUp from '../views/ProcessSignUp';
import axios from 'axios'
import {Card,
    CardActions,
    CardHeader,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Button,
    MenuItem} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import States from '../utils/Estados.json'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

    const Styles ={
        loginList:{
            listStyle:"none"
        },
        loginListItem:{
            display:"inline",
            marginLeft:"5px"
        },
    }
    
    
/** The Signup is the function to create a new account
 * @constructor
 * @param {string} firstName - users first name
 * @param {string} lastName - users last name
 * @param {string} email - users first email
 * @param {string} password - users password
 * @param {string} location - users city
 * @param {file} picture - users profile image/avatar
 * 
 * @param {Boolean} ready - allow the create account
 * @param {Object} error - active the alert in case of error
 */

function Signup(){
    const [firstName,SetName] = useState() 
    const [lastName,SetLastName] = useState() 
    const [email,SetEmail] = useState() 
    const [password,SetPassword] = useState() 
    const [local,SetLocal] = useState('')
    const [picture,SetPicture] = useState()

    const [ready,SetReady] = useState(false)
    const [error,SetError] = useState({onError:false,message:''})

    const handleLocal = (event) => {
        SetLocal(event.target.value);
        
      };

      const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        SetReady(false);
        SetError({onError:false,message:''});
      };

      const HandleFilesUpload = e =>{
        e.preventDefault()
        const files = Object.values(e.target.files)
        files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          //formData.append("tags", `dahwijw8w, medium, gist`);
          formData.append("upload_preset", "lqvmm3lj"); // Replace the preset name with your own
          formData.append("api_key", "316375736115726"); // Replace API key with your own Cloudinary key
         // formData.append("signature", "UyTJCwsJ89rr1ajiPEvWIvz3egc");
          formData.append("timestamp", (Date.now() / 1000) | 0);
      
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post("https://api.cloudinary.com/v1_1/dahwijw8w/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            SetPicture(fileURL)
          })
        });

      }

    const handleSubmit = async (firstName,lastName,email,
        password,picture,local) =>{

          const response = await SIGNUP(firstName,lastName,email,
            password,picture,local)

            //console.log(response)

          if(response.signup !== null){
            SetReady(true)
          }
          else if(response.errors!==null){
            response.errors.map(item => {
               return SetError({onError:true,message:item.message})
            })
          }
  
    }
    
return(
    <div>
            <Card className="home-signup-card">

                <CardHeader title="Sign Up" className="addgame-card-header"
                subheader={
                <ul style={Styles.loginList}>
                <li style={Styles.loginListItem}>já possui uma conta ?</li>
                <li style={Styles.loginListItem}>
                    <a href="/login">click aqui</a>
                    </li>
            </ul>
            }/>
                <form style={{padding:"10px",marginTop:"20px"}}>

            <CardActions>
            <TextField id="outlined-basic"
               label="Nome" variant="outlined" size="small" 
               onChange={e => SetName(e.target.value)}/>
            <TextField id="outlined-basic"
               label="Sobrenome" variant="outlined" size="small" 
               onChange={e => SetLastName(e.target.value)}/>
            </CardActions>

            <CardActions>
            <FormControl variant="outlined" size="small"  style={{width:"190px"}} >
                <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                onChange={handleLocal}
                value={local}
                label="Cidade">

                {States.map(estados => 
                <MenuItem value={estados.Nome} key={estados.ID} >
                    {estados.Sigla} - {estados.Nome}
                </MenuItem>
                )}
                </Select>

                </FormControl>

                <input
                accept="image/*"
                style={{display:"none"}}
                id="contained-button-file"
                multiple
                type="file"
                onChange={HandleFilesUpload}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                Foto de perfil
                </Button>
            </label>

            </CardActions>

            <CardActions>
            <TextField id="outlined-basic"
               label="Email" variant="outlined" size="small" 
               onChange={e => SetEmail(e.target.value)}/>
            <TextField id="outlined-basic"
               label="Senha" variant="outlined" size="small" 
               onChange={e => SetPassword(e.target.value)}/>
            </CardActions>

            <CardActions>
            <Button datatest-id="signup"
            variant="contained" color="secondary" 
            onClick={e => handleSubmit(firstName,lastName,email,
                password,picture,local)}>
                Entrar
            </Button>

            <Button href={process.env.REACT_APP_FB_URL}
            variant="contained" color="primary">
            facebook
            </Button>

            </CardActions>

            {error.onError ?
            <Alert onClose={handleCloseAlert} severity="error">
              {error.message}
            </Alert>

          :""}

          {ready ? <ProcessSignUp email={email} password={password} /> :""}
            

            </form>
            </Card>      
        </div>)

}

export default Signup