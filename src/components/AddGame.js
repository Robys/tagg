import {useState,useContext} from 'react'
import { UserContext } from "../utils/UserContext";
import axios from 'axios'
import {Card,
    CardActions, 
    CardHeader,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextareaAutosize,
    TextField, 
    Button} from '@material-ui/core';

//import { ProgressIcon } from './ProgressIcon';
import AutoCompleteInput from './AutoCompleteInput';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/** These component collect the input info to add a game to user collection
 * 
 * @param {string} title - The title of the game.
 * @param {string} gender - The type of the game.
 * @param {string} videogame - The platform/videogame from the game.
 * @param {string} value - The value of the game.
 * @param {string} status - The physic condition of the game/media.
 * @param {string} description - Short text about the game.
 * @param {file} cover - A photo or the cover of the game.
 */


const AddGame = ({isCurrentUser}) =>{
  var {user} = useContext(UserContext)

    const [title, SetTitle] = useState('');
    const [price, SetPrice] = useState('');
    const [cover, SetCover] = useState('');
    const [description, SetDescription] = useState('');
    const [videogame, SetConsole] = useState('');
    const [status, SetStatus] = useState('');
    const [gender,SetGender] = useState('');

    const [ready,SetReady] = useState(false);
    const [error,SetError] = useState({onError:false,message:''});

    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      SetReady(false);
      SetError({onError:false,message:''});
    };

    const handleConsole = (event) => {
        SetConsole(event.target.value);
        
      };
    const handleStatus = (event) => {
        SetStatus(event.target.value);
        
      };
    const handleGender = (event) => {
        SetGender(event.target.value);
        
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
            SetCover(fileURL)
            
        });

      })


    }

      
      function handleSubmit (title,price,videogame,description,
        gender,status,cover){

          var id = user ? user.id : "123456789"

        axios.post(process.env.REACT_APP_API_URL,{
            query:`mutation{
                createGame(owner:"${id}",title:"${title}",value:"${price}",
                platform:"${videogame}",description:"${description}",
                gender:"${gender}",status:"${status}",cover:"${cover}"){
                    id
                    title
                    status
                }
            }`,
            headers: {
              "Content-Type": 'application/json'
            } 
        })
        .then(res => {
         // console.log(res.data)
         setTimeout(()=>{
           
           SetReady(true)
        },1500)
        window.location.reload()
        
        })
        .catch(err => {
          SetError({onError:true,message:err.message})
        })
      }
 

    return (
        <div>

            <Card className="addgame-card" style={{display: isCurrentUser ? "inline-block" : "none"}}>
            <CardHeader title="Adicionar Jogo"
               className="addgame-card-header"/>

               <CardActions>

               <AutoCompleteInput SetTitle={SetTitle} title={title}/>
               
                </CardActions>

                <CardActions>
                <FormControl variant="outlined" size="small" className="addgame-input"  >
                <InputLabel id="demo-simple-select-outlined-label">Console</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                onChange={handleConsole}
                value={videogame}
                label="Console">
                            <MenuItem value="pc">PC</MenuItem>
                            <MenuItem value="playstation">Playstation</MenuItem>
                            <MenuItem value="xbox">Xbox</MenuItem>
                            <MenuItem value="nintendo">Nintendo</MenuItem> 
                            <MenuItem value="outro">Outro</MenuItem> 
                    </Select>
                </FormControl>
                
                <FormControl variant="outlined" size="small" className="addgame-input"  >
                <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                onChange={handleStatus}
                value={status}
                label="Estado">
                            <MenuItem value="usado">Usado</MenuItem>
                            <MenuItem value="novo">Novo</MenuItem>
                            <MenuItem value="antigo">Antigo</MenuItem>
                            <MenuItem value="lacrado">Lacrado</MenuItem>
                            <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                </FormControl>
                </CardActions> 

                <CardActions>
                <TextField id="outlined-basic"
               className="addgame-input" 
               label="Valor" variant="outlined" size="small" 
               onChange={e => SetPrice(e.target.value)}/>

                <FormControl variant="outlined" size="small" className="addgame-input"  >
                <InputLabel id="demo-simple-select-outlined-label">Genero</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                onChange={handleGender}
                value={gender}
                label="Estado">
                            <MenuItem value="ação">Ação</MenuItem>
                            <MenuItem value="aventura">Aventura</MenuItem>
                            <MenuItem value="esportes">Esportes</MenuItem>
                            <MenuItem value="corrida">Corrida</MenuItem>
                            <MenuItem value="luta">Luta</MenuItem>
                            <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                </FormControl>


                </CardActions>

                <CardActions>
                <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Descrição</InputLabel>
                <TextareaAutosize minRows={4} className="addgame-textarea"
                onChange={e => SetDescription(e.target.value)}/>
                </FormControl>

                </CardActions>

                <CardActions className="addgame-card-actions"> 
                <input
                accept="image/*"
                style={{display:"none"}}
                id="contained-button-file"
                multiple
                type="file"
                onChange={HandleFilesUpload}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                Foto
                </Button>
            </label>

                
                
                <button datatest-id="submit"
                onClick={e => handleSubmit(title.title,price,videogame,description,
                  gender,status,cover)} >Salvar</button>
                </CardActions>
                
            {ready ?
            <Alert onClose={handleCloseAlert} severity="success">
              Jogo adicionado com sucesso
            </Alert>

          :""}
            {error.onError ?
            <Alert onClose={handleCloseAlert} severity="error">
              Falha ao salvar informações : {error.message}
            </Alert>
          :""}
          
            </Card>
            
        </div>
    )
}

export default AddGame
