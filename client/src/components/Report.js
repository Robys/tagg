import React from 'react'
import {OverlayTrigger,Button,Popover} from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_NOTIFY} from '../api/mutations'

export default function Report (){
    const [createNotify,{data,loading,error}] = useMutation(CREATE_NOTIFY)

    const popover = (
        <Popover id="popover-basic" style={{backgroudColor:"#EAE6DA",color:"#21211F"}}>
        <Popover.Title as="h3">Reportar</Popover.Title>
        <Popover.Content>
        você pode reportar a administração se existe algo de errado com o anúncio,
        e a equipe entrá em contato ou tomará providências.
        </Popover.Content>

    </Popover>
    )

    return (
        <>
        <OverlayTrigger 
        key={'right'} 
        placement={'right'}
        overlay={popover}>
            <Button>Reportar</Button>
        </OverlayTrigger>
        </>
    )
}