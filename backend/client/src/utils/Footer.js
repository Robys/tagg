import {Image,Nav,Form,Button} from 'react-bootstrap'
import logo from '../imgs/tagg-logo-light-1.png'

export default function Footer (){

    return(
        <footer className="footer-logo-area">
            <div>
                <Image src={logo} alt="Tagg"/>
            </div>
                <div className="footer-text">
                    <h4>Tagg</h4>
                    <h5>Troque agora games</h5>
                    <p>Criado em 2021, o Tagg (ou troque agora games)
                     e tem como objetivo simplificar e agilizar a vida, 
                        de quem esta trocando seus games usados, ou pensado em comprar um. </p>
                    <p>Um site criado de gamer pra gamer</p>

                    <Nav>
                       <h4>Siga-nos</h4>
                       <Nav.Link>Facebook</Nav.Link>
                       <Nav.Link>Instagram</Nav.Link>
                       <Nav.Link>Twitter</Nav.Link>
                       <Nav.Link>Linkedin</Nav.Link>

                   </Nav>       
                </div>

                <div className="footer-text">
                       <h4>Fale com a gente</h4>
                       <Form>
                           <Form.Control type="text" placeholder="informe seu email"/>
                           <Form.Control type="textarea" style={{width:"200px",height:"100px"}}
                           placeholder="deixe seu recado aqui!"/>
                           <Button>Enviar</Button>
                       </Form>
                </div>

                <div className="footer-end">
                    <p>Copyright by: Robert Oliveira @ 2021</p>     
                </div>
     
        </footer>
    )
}