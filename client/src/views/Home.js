import React from 'react'
import SignUp from '../components/SignUp'
import Footer from '../utils/Footer'
import {Card,Accordion,Button,Image} from 'react-bootstrap'
import what1 from '../imgs/home-card-1.jpg'
import what2 from '../imgs/home-card-2.jpg'
import what3 from '../imgs/home-card-3.jpg'
import taGif from '../imgs/tag.gif'

export default function Home(){
    return(
        <div className="home">
            <ul>
                <li>

                <div className="user-call">
                    <Image src={taGif} alt="tagg-logo"/>
                </div>
                </li>

                <li>

                <SignUp/>

                </li>

                </ul>

                <section className="content">
                    <h4>O que é o Tagg ?</h4>

                    <Card className="home-card">
                        <Card.Img src={what1} alt="info1"/>
                            <Card.Body>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut 
                                 labore et dolore magna aliqua.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="home-card">
                            <Card.Img src={what2} alt="info2"/>
                            <Card.Body>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut 
                                 labore et dolore magna aliqua.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        <Card className="home-card">
                        <Card.Img src={what3} alt="info3"/>
                            <Card.Body>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut 
                                 labore et dolore magna aliqua.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                </section>

                <section className="content">
                    <h4>FAQ</h4>

                    <Accordion className="faq">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Vantagens
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Perguntas Frequentes
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    </Accordion>
                        
                </section>

                <Footer/>

        </div>
    )
}