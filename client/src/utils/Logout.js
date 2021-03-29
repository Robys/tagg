import { useMutation } from '@apollo/react-hooks'
import {Button} from 'react-bootstrap'
import {LOGOUT} from '../api/mutations'

export const Logout = () =>{
    const [logout] = useMutation(LOGOUT)

    return(

        <Button variant="danger" className="logout-button"
        href="/" onClick={e=>{
        logout()}}> Sair </Button>

    )
}