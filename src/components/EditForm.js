import axios from 'axios'
import {useState} from 'react'
import {UPDATEGAME,UPDATEUSER,SENDREPORT,CREATENOTIFICATION, UPDATEREPORT} from '../api'

import {
    DialogActions,
    ButtonGroup,
    Button,
    TextField,
    TextareaAutosize,
    MenuItem,
    FormControl,
    InputLabel,
    Select} from '@material-ui/core'

import States from '../utils/Estados.json'
import { ProgressIcon } from "./ProgressIcon"
import RemoveGameButton from "./RemoveGameButton";
import ChangeAccountStatusButton from './ChangeAccountStatusButton'

/** This form allow the user to edit the game information,
 * the game object is provited by the Edit Game component
 * 
 * @param {Object} game - the game to be edited
 * @param {Function} handleClose - toggle on/off the dialog
 */

const  EditGameForm = ({game,handleClose}) =>{

    const [title, SetTitle] = useState();
    const [value, SetValue] = useState();
    const [cover, SetCover] = useState();
    const [description, SetDescription] = useState();
    const [videogame, SetConsole] = useState();
    const [status, SetStatus] = useState();
    const [gender,SetGender] = useState();

    const [loading,SetLoading] = useState({status:""})


 
    const handleTitle = (event) => {
        SetTitle(event.target.value);
     };
 
    const handleValue = (event) => {
       SetValue(event.target.value);
       
     };
    const handleDescription = (event) => {
        SetDescription(event.target.value);

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
        SetLoading({isLoading:"true"})
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
            SetLoading({isLoading:"false"})
        });
  
      })
  
  
    }

    const handleSaving = async () =>{

        const upTitle = title === undefined ? game.title : title
        const upGender = gender === undefined ? game.gender : gender
        const upVideogame = videogame === undefined ? game.platform : videogame
        const upDescription = description === undefined ? game.description : description
        const upCover = cover === undefined ? game.cover : cover
        const upStatus = status === undefined ? game.status : status
        const upValue = value === undefined ? game.value : value
        
        await UPDATEGAME({game,upTitle,upGender,upValue,upVideogame,upStatus,upCover,upDescription})
        handleClose()
        window.location.reload()

        /**
         * 
         */
    }

    return(
        <div>
            <DialogActions>
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
                trocar foto
                </Button>
            </label>

            <ProgressIcon loading={loading} className="progress-icon"/>

            <TextField
               className="addgame-input"
               label="Titulo" variant="outlined" size="small" 
               onChange={handleTitle}/>
            </DialogActions>

            <DialogActions>

            <TextField 
               className="addgame-input"
               label="Valor" variant="outlined" size="small" 
               onChange={handleValue}/>

                <FormControl variant="outlined" size="small" className="addgame-input"  >
                <InputLabel id="demo-simple-select-outlined-label">Console</InputLabel>
                <Select defaultValue=""  
                labelId="demo-simple-select-outlined-label"
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

            </DialogActions>

            <DialogActions>
            <FormControl variant="outlined" size="small" className="addgame-input"  >
                <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                <Select defaultValue=""  
                labelId="demo-simple-select-outlined-label"
                onChange={handleStatus}
                value={status}
                label="Estado">
                            <MenuItem value="usado">Usado</MenuItem>
                            <MenuItem value="novo">Novo</MenuItem>
                            <MenuItem value="lacrado">Lacrado</MenuItem>
                            <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" size="small" className="addgame-input"  >
                <InputLabel id="demo-simple-select-outlined-label">Genero</InputLabel>
                <Select defaultValue=""  
                labelId="demo-simple-select-outlined-label"
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

            </DialogActions>

            <DialogActions>
                <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Descrição</InputLabel>
                <TextareaAutosize rows={4} className="addgame-textarea" 
                onChange={handleDescription}/>
                </FormControl>

                </DialogActions>

                <DialogActions>
                  <Button size="small" variant="contained" 
                  color="primary" onClick={handleSaving}>Salvar</Button>
                  <RemoveGameButton game={game}/>
                  <Button onClick={handleClose}>Fechar</Button>
      
              </DialogActions>
        </div>
    )



}

/** This form allow the user to edit your own information,
 * the user object is provited by the Edit User component
 * 
 * @param {Object} user - the game to be edited
 * @param {Function} handleClose - toggle on/off the dialog
 */

const EditUserForm = ({user,handleClose}) =>{
    const [firstName,SetName] = useState() 
    const [lastName,SetLastName] = useState() 
    const [email,SetEmail] = useState() 
    const [password,SetPassword] = useState() 
    const [local,SetLocal] = useState('')
    const [picture,SetPicture] = useState()

    const handleLocal = (event) => {
        SetLocal(event.target.value);
        
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

      const handleSaving = async () =>{
          const nameToSave = firstName === undefined ? user.firstName : firstName;
          const lastNameToSave = lastName === undefined ? user.lastName : lastName;
          const emailToSave = email === undefined ? user.email : email;
          const passwordToSave = password === undefined ? user.password : password;
          const localToSave = local === undefined ? user.local : local;
          const pictureToSave = picture === undefined ? user.picture : picture;

          await UPDATEUSER({user,nameToSave,lastNameToSave,emailToSave,passwordToSave,localToSave,pictureToSave})
          
          handleClose()
          window.location.reload()
      }

    return (
        <div>

            <DialogActions>
            <TextField id="outlined-basic"
               label="Nome" variant="outlined" size="small" 
               onChange={e => SetName(e.target.value)}/>
            <TextField id="outlined-basic"
               label="Sobrenome" variant="outlined" size="small" 
               onChange={e => SetLastName(e.target.value)}/>

            </DialogActions>

            <DialogActions>
            <TextField id="outlined-basic"
               label="Email" variant="outlined" size="small" 
               onChange={e => SetEmail(e.target.value)}/>
            <TextField id="outlined-basic"
               label="Senha" variant="outlined" size="small" 
               onChange={e => SetPassword(e.target.value)}/>
            </DialogActions>

            <DialogActions>
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
  
            </DialogActions>

            <DialogActions>
                <ButtonGroup>

                  <Button size="small" variant="contained" 
                  color="primary" onClick={handleSaving}>Salvar</Button>


                  <ChangeAccountStatusButton user={user}/>
                  
                  <Button size="small" variant="contained" 
                  onClick={handleClose}>Fechar</Button>
                </ButtonGroup>

      
              </DialogActions>


        </div>
    )
}

/** This form allow the user create a Report of strange activity, 
 * @param {Object} sender - user who's is sending the report 
 * @param {Function} HandleClose - toggle on/off the dialog
 */

const ReportForm = ({sender,HandleClose}) =>{
  const [content,SetContent] = useState()

  const handleSendReport = async () =>{
    await SENDREPORT({sender,content});
    HandleClose()
  }

  return (
    <div>

    <DialogActions>
      <textarea placeholder="descreva a situação"
      rows={4} cols={50} onChange={e => SetContent(e.target.value)}/>

    </DialogActions>

    <Button onClick={handleSendReport}>Enviar</Button>
    </div>
  )
}

/** This form allow the adminstrator or manager to answer the report
 * 
 * @param {Object} report - report to be answer
 * @param {Object} currentUser - user who will update the report
 * @param {Object} receiver - person who create the report
 * @param {Function} HandleClose - toggle on/off the dialog
 */

const UpdateReportForm = ({report,currentUser,receiver,HandleClose})=>{
  const [content,SetContent] = useState()

  const handleCreateNotification = async () =>{
    await CREATENOTIFICATION(currentUser,receiver,content)
    if(report!==null)
      handleUpdateReport()
    else
    HandleClose()
  }

  const handleUpdateReport= async () =>{
    await UPDATEREPORT(report)
    HandleClose()
    window.location.reload()
  }

  return (

    <div>

    <DialogActions>
      <textarea placeholder="retorne seu parecer aqui"
      rows={4} cols={50} onChange={e => SetContent(e.target.value)}/>

    </DialogActions>
    <Button onClick={handleCreateNotification}>Enviar</Button>
    <Button onClick={HandleClose}>Fechar</Button>
    
    </div>

  )
}

export {EditGameForm,EditUserForm,ReportForm,UpdateReportForm}