import { useMutation } from '@apollo/react-hooks'
import {Nav} from 'react-bootstrap'
import {LOGOUT} from '../api/mutations'

export const Logout = () =>{
    const [logout] = useMutation(LOGOUT)

    return(

        <Nav.Link href="/" onClick={e=>{
        logout()}}> Sair </Nav.Link>

    )
}