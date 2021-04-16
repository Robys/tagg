/**
 * Caixa onde o usuário insere a mensagem a ser enviada
 * **/

import {useState} from 'react'
import {Card,Form,Button} from 'react-bootstrap'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_MESSAGE} from '../api/mutations'

export default function ChatBox ({chatId,receiver,current}){

    const [content,setContent] = useState()
    const [CreateMessage] = useMutation(CREATE_MESSAGE)

    return (
        <Card.Footer className="chat-box">
                <Form onSubmit={e =>{
                 e.preventDefault()
                    CreateMessage({variables: {chatId:chatId,receiver:receiver.id,from:current.id,content:content} })
                }}>
                    <Form.Group>
                        <Form.Control as="textarea" row={3} className="chat-input" onChange={e => setContent(e.target.value)}/>

                    </Form.Group>
                        <Button type="submit">
                            Enviar
                        </Button>
                </Form>
        </Card.Footer>
    )
}