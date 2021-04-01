/**
 * Botão de LOGOUT, permite que usuário saia da aplicação.
 * **/

import React from 'react'
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