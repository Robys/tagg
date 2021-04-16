/**
 * Componente responsável por adicionar os games 
 * na coleção do usuário.
 * **/


import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {useState} from 'react'
import {ADD_GAME} from '../api/mutations'
import {publishers} from '../utils/utils'
import {Form,InputGroup,Button} from 'react-bootstrap'

const AddGame = (props) => {
    const [title,SetTitle] = useState()
    const [publisher,SetPublisher] = useState()
    const [platform,SetPlatform] = useState()
    const [status,SetStatus] = useState()
    const [cover,SetPicture] = useState()
    const [value,SetValue] = useState()
    const [description,SetDesc] = useState()
    const [addGame] = useMutation(ADD_GAME)

    /** mini função que converte aquivos
     * para base64 **/
    const convertFile = e =>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (){
            var b64 = reader.result
            SetPicture(b64)
        }
    }

    return(
        <div className="add-game">
            <h3>Adicionar Game</h3>
            <Form onSubmit={e => {
               
            addGame({
                variables: {
                    owner:props.current,
                    title:title,
                    publisher:publisher,
                    platform:platform,
                    status:status,
                    value:value,
                    description:description,
                    cover:cover} }) 
            }}>
                <InputGroup size="sm" style={{marginBottom:"5px"}}>
                <Form.Control  placeholder="titulo do jogo" onChange={e => SetTitle(e.target.value)}/>
                <Form.Control as="select" onChange={e => SetPublisher(e.currentTarget.value)}>
                    <option>publisher</option>
                    {publishers.map(p => 
                    <option value={p.name} key={p.name}>
                        {p.name}
                    </option>)}

                </Form.Control>
                
                </InputGroup>
                
                <InputGroup size="sm" style={{marginBottom:"5px"}}>
                <Form.Control as="select"onChange={e => SetPlatform(e.currentTarget.value)}>
                    <option>plataforma</option>
                    <option value="Playstation">Playstation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="PC">PC</option>
                    <option value="Other">Outro</option>
                </Form.Control>

                <Form.Control as="select" onChange={e => SetStatus(e.currentTarget.value)}>
                    <option>estado</option>
                    <option value="Lacrado">Lacrado</option>
                    <option value="Novo">Novo</option>
                    <option value="Usado">Usado</option>
                    <option value="Danificado">Danificado</option>
                    <option value="Other">Outro</option>
                </Form.Control>
                
                </InputGroup>


                <Form.File id="myfile" onChange={convertFile}/>

                <Form.Control placeholder="value" onChange={e=> SetValue(e.target.value)} />
                <Form.Control as="textarea" placeholder="descrição" onChange={e=> SetDesc(e.target.value)} rows="3" />

                <Button type="submit">Adicionar</Button>

            </Form>

        </div>
    )
}

export default AddGame