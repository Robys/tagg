import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {UPDATEREQUEST} from '../api'

export default function RequestOptions({request}){

  const onUpdateRequest = async (status) =>{
    await UPDATEREQUEST(request,status)

  }
  
    return (
        <ButtonGroup aria-label="small outlined button group">
        <Button href="/requests" onClick={e => onUpdateRequest("aceito")}>Aceitar</Button>
        <Button href="/requests" onClick={e => onUpdateRequest("negado")}>Negar</Button>

      </ButtonGroup>
    )
}

/**
 * if(res.data.errors!==null){
        SetOnError({onError:true,message:res.data.errors[0].message})
      }
      else{
        SetOnSuccess(true)
      }
    }
 */