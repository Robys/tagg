import React from 'react'
import SignUp from '../components/SignUp'
import Footer from '../utils/Footer'
import {Card,
    Accordion,
    Button,
    Image, 
    Container,
    Navbar, 
    Row,
    Col} from 'react-bootstrap'
import what1 from '../imgs/home-card-1.jpg'
import what2 from '../imgs/home-card-2.jpg'
import what3 from '../imgs/home-card-3.jpg'
import taGif from '../imgs/tag.gif'
import logo from '../imgs/icons/tagg-logo-orange.png'

export default function Home(){
    return(
        <div className="home">
            <Navbar style={{height:"50px"}}>
                <Navbar.Brand href="/">
                <Image src={logo} alt="tagg" style={{width:"48px",height:"48px"}}/>
                </Navbar.Brand>
                </Navbar>
            <Container>
                <Row>
                    <Col>
                    <Image src={taGif} alt="tagg-logo" className="tagg-logo-big"/>
                    </Col>

                    <Col>
                    <SignUp/>
                    </Col>

                </Row>

            </Container>

                <section className="content">
                     <h2>O que é o Tagg ?</h2>

                    <Card className="home-card">
                        <Card.Img src={what1} alt="info1"/>
                            <Card.Body>
                                <Card.Text>
                                Tagg é uma sigla para "Troque agora games",
                                um site criado para você trocar seus jogos, novos ou usados
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="home-card">
                            <Card.Img src={what2} alt="info2"/>
                            <Card.Body>
                                <Card.Text>
                                O Tagg simplifica sua busca, tornando a experiência de 
                                trocar jogos muito mais legal. 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        <Card className="home-card">
                        <Card.Img src={what3} alt="info3"/>
                            <Card.Body>
                                <Card.Text>
                                Simples e intuítivo, o Tagg foi feito de gamer para gamer.
                                Comece já!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                </section>
                <section className="faq">
                    <h2>FAQ</h2>

                    <Accordion>
                    <Card style={{backgroundColor:"#21211F",textAlign:"left"}}>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Vantagens
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Title>Nada Para Atrapalhar</Card.Title>
                            <Card.Text>Com o Tagg você encontra o game 
                                que você está procurando, sem anúncios que não te interresse</Card.Text>
                                <Card.Title>Fácil de usar</Card.Title>
                            <Card.Text> A interface é símples e intuítiva </Card.Text>
                            <Card.Title>Liberdade</Card.Title>
                            <Card.Text>Troque, negocie ou somente conheça outros players, 
                                na hora que você quiser </Card.Text>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card style={{backgroundColor:"#21211F",textAlign:"left"}}>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Perguntas Frequentes
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Card.Title>
                                Como crio uma conta ?
                            </Card.Title>
                            <Card.Text>
                                Criar uma conta no Tagg é muito símples,
                                basta inserir suas informações, 
                                ou acessar utilizando seu perfil do Facebook
                            </Card.Text>
                            <Card.Title>
                                Como Adiciono meus jogos ?
                            </Card.Title>
                            <Card.Text>
                                A página de Perfíl de usuário possuí o formulário para adicionar
                                o jogo á coleção. É importante que você escolha uma foto legível do jogo
                                e preencher a área de descrição.
                            </Card.Text>
                            <Card.Title>
                                Como posso fazer uma troca ?
                            </Card.Title>
                            <Card.Text>
                                Após inserir algum titulo á sua coleção, você pode propor uma troca
                                clicando no botão propor uma troca na página de detalhes do jogo escolhido. 
                            </Card.Text>
                            <Card.Title>
                                Digitei o nome/informação errada e agora?
                            </Card.Title>
                            <Card.Text>
                                Não se preoculpe, só acessar a página de detalhes do jogo e clicar em "editar jogo"
                            </Card.Text>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    </Accordion>
                        
                </section>

                <Footer/>

        </div>
    )
}