import React from 'react'
import {Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails } from '@material-ui/core'
import card1 from '../imgs/home-card-1.jpg'
import card2 from '../imgs/home-card-2.jpg'
import card3 from '../imgs/home-card-3.jpg'

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logo from '../imgs/tagg-logo.png'

export const HomeContent = () =>{

    return (
        <Box className="site-content">
            <div className="site-content-header">
                <h2>Sobre o Site</h2>
            </div>

            <div className="site-content-cards">
                <Card className="site-content-card">

                    <CardMedia image={card1} 
                    style={{width: "100%", height: "320px"}}
                    title="imagem genérica"/>

                    <CardContent className="site-content-card-text">
                        <Typography component="p">
                            O Tagg, ou "troque agora games" é um site
                            para troca ou venda de jogos, onde você pode interagir
                            com outras pessoas. 
                        </Typography>

                    </CardContent>

                </Card>

                <Card className="site-content-card">

                    <CardMedia image={card2} 
                    style={{width: "100%", height: "320px"}}
                    title="imagem genérica"/>

                    <CardContent className="site-content-card-text">
                        <Typography component="p">
                            Pensado para ser rápido, a interfáce é
                            simples e de fácil usabilidade, você pode acessar usando
                            computadores, celulares ou tablets.
                        </Typography>

                    </CardContent>

                    </Card>

                <Card className="site-content-card">

                    <CardMedia image={card3} 
                    style={{width: "100%", height: "320px"}}
                    title="imagem genérica"/>

                    <CardContent className="site-content-card-text">
                        <Typography component="p">
                            O Tagg é um ambiente de respeito e sentimento de comunidade,
                            qualquer comportamento preconceituso como racismo, xenofobia,
                            homofobia e afins não serão tolerados. 
                        </Typography>

                    </CardContent>

                    </Card>
            </div>

        </Box>
    )
}

export const FAQ = () =>{

    return (
        <Box className="site-content">
             <div className="site-content-header">
                <h2>Duvidas Frequentes</h2>
            </div>

            <div className="site-content-faq">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Por onde começar? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Basta criar uma conta inserindo seus dados, ou utilizando o login do Facebook.
                </Typography>
                </AccordionDetails>

            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Como inicio uma troca ? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Escolha um jogo anunciado e clique em "propor troca", escolha um jogo de sua coleção e pronto!
                </Typography>
                </AccordionDetails>

            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Posso desativar/reativar minha conta ? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Em seu perfil, clique em "Editar perfil" e em seguida em "desativar conta"
                </Typography>
                </AccordionDetails>

            </Accordion>

            </div>

        </Box>
    )
}

export const Footer = () =>{

    return (
        <footer>

            <div className="footer-content">
                <ul style={{listStyle:"none"}}>
                <li style={{display:"inline-flex"}}>
                    <img src={logo} style={{height:"150px",width:"150px"}}/>
                </li>

                <li style={{display:"inline-flex", color:"black"}}>
                    
                    <p>
                        <strong>Tagg - Troque agora games </strong> 
                        é um projeto sem fins lucrativos
                    </p>
                </li>
                    
                </ul> 
            </div>
        <div className="footer-end">

            <ul>
                <li>
                   <FacebookIcon/> 
                </li>
                <li>
                   <InstagramIcon/> 
                </li>
                <li>
                   <TwitterIcon/> 
                </li>

            </ul>
        </div>

        </footer>
    )
}
