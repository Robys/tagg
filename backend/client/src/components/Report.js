import React from 'react'
import {OverlayTrigger,Button,Popover} from 'react-bootstrap'
import {FindCurrent} from '../utils/utils'
import {useMutation} from '@apollo/react-hooks'
import {APP_REPORT} from '../api/mutations'

export default function Report ({about,content}){
    const [createAppReport] = useMutation(APP_REPORT)

    const sender = FindCurrent()

    const SendReport = e =>{
        e.preventDefault()
        let message = ''
        if(content==='game'){
            message = `${sender.firstName} está reportando o game com id ${about}`
        }
        if(content==='troca'){
            message = `${sender.firstName} está reportando a troca com id ${about}`
        }

        createAppReport({variables: {from:sender.id,content:message} })
        .then(({ data }) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });

    }

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
            <Button onClick={e => SendReport(e)}>Reportar</Button>
        </OverlayTrigger>
        </>
    )
}