// Imports de react.
import React from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, } from 'reactstrap';

// Imports de config-components.
import {Navbars} from '../../config-components/Navbars'
import Example from '../../config-components/Tabs'

import { A, AWhatsapp } from '../../config-components'
// } from 'components-links'

// Imports de assets.
import Blog from '../../img/test.jpg'
import Heroxs from '../../img/hero-xs.png'
import {ImgCristian, ImgDiego} from '../../img'
import Figma from '../../img/figma.svg'
import WebApps from '../../img/vscode.svg'
import HTML5 from '../../img/html5.svg'
import * as FaIcons from "react-icons/fa"

function Landing() {
  return (
    <div>
        <Navbars />
        <section id="hero" className="bg-light d-flex py-6">
            <Container className="align-self-center">
                <Row>
                    <Col lg="6">
                        
                    </Col>
                    <Col lg="6">
                        <A href="https://www.youtube.com/channel/UCj_JuLDPgqkQ40RWFsRrzgg" target="_blank" className="d-inline-block mb-3"> <FaIcons.FaRegPlayCircle className="lead mr-1" /> Conócenos en Youtube</A>
                        <h1 className="display-4 font-weight-bold mb-3">Somos expertos en Web Apps.</h1>
                        <p className="text-muted mb-4">Creamos tu página o aplicación web con las mejores y más recientes tecnologías para mejorar tu presencia en línea.</p>
                        <AWhatsapp 
                            phone='+525541834122' 
                            message={`Hola, quiero información para una aplicación web`} 
                            className="btn btn-primary"
                        >Cotiza tu proyecto</AWhatsapp>
                    </Col>
                </Row>
                <img src={Heroxs} className="img-fluid d-block d-md-none mt-5" />
            </Container>
        </section>

        <section>
            <Container>
                <Row className="py-6">
                    <Col lg="6">
                      <img src={Figma} className="img-fluid rounded my-4" />
                    </Col>
                    <Col lg="6" className="d-flex">
                        <div className="align-self-center p-4">
                            <h2 className="display-4 font-weight-bold mb-4">Diseño UX / UI<span className="text-primary">.</span></h2>
                            <p className="text-muted mb-4">Una buena implementación de diseño UX UI en una aplicación o sitio web tiene como resultado un mayor porcentaje de conversiones.</p>
                            <AWhatsapp 
                                phone='+525541834122' 
                                message={`Hola, Quiero información para diseño`} 
                                className="btn btn-primary"
                            >Cotiza ahora</AWhatsapp>
                            <A href="https://youtu.be/7fps9ILAi-8" target="_blank" className="btn btn-link"><u>Aprende en Youtube</u></A>
                        </div>
                    </Col>
                </Row>
                <Row className="py-6">
                    <Col lg="6" className="d-flex">
                        <div className="align-self-center p-4">
                            <h2 className="display-4 font-weight-bold mb-4">Web Apps<span className="text-primary">.</span></h2>
                            <p className="text-muted mb-4">Las aplicaciones web se han vuelto indispensables para que las empresas puedan crecer en un mercado cada vez más competitivo. Contáctanos para comenzar a desarrollar tu Web App.</p>
                            <AWhatsapp 
                                phone='+525541834122' 
                                message={`Hola, Quiero información para una aplicación web`} 
                                className="btn btn-primary"
                            >Cotiza ahora</AWhatsapp>
                            <A href="https://youtu.be/9SSt0WRJLr4" target="_blank" className="btn btn-link"><u>Aprende en Youtube</u></A>
                        </div>
                    </Col>
                    <Col lg="6">
                        <img src={WebApps} className="img-fluid rounded my-4" />
                    </Col>
                </Row>
            </Container>
        </section>  
        
        <section className="py-6">
            <Container>
                <div className="tab-container bg-light py-4 px-5">
                    <Example />
                </div>
            </Container>
        </section>   
        <section className="bg-light py-6">
            <Container>
                <h2 className="font-weight-bold">Nuestro equipo de especialistas.</h2>
                <p className="text-muted mb-5">Somos un grupo de expertos en diseño y desarrollo web.</p>
                <Row>
                    <Col lg="4">
                        <Card className="border-0 my-3">
                            <CardBody>
                                <ImgDiego className="avatar mb-3" />
                                <h5 className="font-weight-bold">Diego Velázquez</h5>
                                <small className="d-block text-primary text-uppercase mb-3">Diseñador UX / UX</small>
                                <p className="text-muted">Software architect, UX designer, and front-end developer.</p>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item"><A href="https://www.linkedin.com/in/diego-velazquez-rabasa/" target="_blank"><FaIcons.FaLinkedin className="lead text-muted mr-2" /></A></li>
                                    <li className="list-inline-item"><FaIcons.FaEnvelope className="lead text-muted mr-2" /></li>
                                    <li className="list-inline-item"><A href="https://dribbble.com/diegovr7" target="_blank"><FaIcons.FaDribbble className="lead text-muted mr-2" /></A></li>
                                    <li className="list-inline-item"><A href="https://www.youtube.com/c/TempluneDisenoWeb" target="_blank"><FaIcons.FaYoutube className="lead text-muted" /></A></li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card className="border-0 my-3">
                            <CardBody>
                                <ImgCristian  className='avatar mb-3'/>
                                <h5 className="font-weight-bold">Cristian Palacios</h5>
                                <small className="d-block text-primary text-uppercase mb-3">Fullstack Developer</small>
                                <p className="text-muted">Senior software engineer with passion for designing and implementing.</p>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item"><A href="https://www.linkedin.com/in/cristian-omar-palacios-beltran-9b64b9160/" target="_blank"><FaIcons.FaLinkedin className="lead text-muted mr-2" /></A></li>
                                    <li className="list-inline-item"><FaIcons.FaEnvelope className="lead text-muted mr-2" /></li>
                                    <li className="list-inline-item"><A href="https://www.youtube.com/c/TempluneDisenoWeb" target="_blank"><FaIcons.FaYoutube className="lead text-muted" /></A></li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className="bg-light py-6">
            <Container>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="border-0">
                                <div className="d-flex">
                                    <img src={HTML5} className="img-fluid  align-self-baseline mr-3" />
                                    <div>
                                        <h4 className="font-weight-bold mb-2">Introducción a HTML5</h4>
                                        <small className="d-block text-muted mb-4">Aprende HTML5, CSS, JavaScript y React para desarrollar cualquier interfaz y disponer de uno de los perfiles más demandados. También en remoto: asiste a tu clase en tiempo real desde casa.</small>
                                    </div>
                                </div>
                                <div>
                                    <FaIcons.FaRegClock /> <small>4 horas</small>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className="d-flex">
                                <ImgCristian  className='avatar mr-3'/>
                                <div className="align-self-center">
                                    <h6 className="font-weight-bold mb-0">Cristian Palacios</h6>
                                    <small className="text-muted">Desarrollador fullstack</small>
                                </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className="bg-light py-6">
            <Container>
            <h2 className="font-weight-bold mb-5">Aprende con nosotros en Youtube.</h2>
                <Row>
                    <Col lg="6">
                        <div className="my-3">
                            <img src={Blog} className="img-fluid rounded mb-4" alt="blog" />
                            <p className="text-primary light mb-3"> <FaIcons.FaRegPlayCircle className="text-primary lead mr-2" />Tutorial Youtube</p>
                            <h4 className="font-weight-bold mb-3">Curso de React básico para principiantes</h4>
                            <p className="text-muted mb-4">En este curso aprenderás a ReactJS para crear aplicaciones Web.</p>
                            <div className="d-flex">
                            <ImgDiego className="img-fluid author mr-3" />
                               
                                <div>
                                    <p className="font-weight-bold mb-0">Diego Velázquez</p>
                                    <small className="text-muted">Diseñador UI / UX</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="my-3">
                            <img src={Blog} className="img-fluid rounded mb-4" alt="blog" />
                            <p className="text-primary mb-3"> <FaIcons.FaRegPlayCircle className="text-primary lead mr-2" />Tutorial Youtube</p>
                            <h4 className="font-weight-bold">The guide to product analytics</h4>
                            <p className="text-muted mb-4">En este curso aprenderás a ReactJS para crear aplicaciones Web.</p>
                            <div className="d-flex">
                                <ImgDiego className="img-fluid author mr-3" />
                                <div>
                                    <p className="font-weight-bold mb-0">Cristian Palacios</p>
                                    <small className="text-muted">Frontend Developer</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className="py-7">
            <Container>
                <div className="w-75 mx-auto text-center mb-5">
                    <h2 className="display-4 font-weight-bold">
                        <AWhatsapp 
                            phone='+525541834122' 
                            message={`Hola, Quiero información para un proyecto`} 
                            className="text-dark"
                        >Contáctanos ahora</AWhatsapp>
                    </h2>
                    <p className="lead text-muted">Comienza tu proyecto ahora y empieza a aumentar tus ventas en línea.</p>
                </div>
            </Container>
        </section>
        <footer className="py-3">
            <Container>
                <Row>
                    <Col lg="6">
                        <ul className="list-unstyled">
                            <li className="list-inline-item mr-5"><A href="https://www.youtube.com/c/TempluneDisenoWeb" class="text-dark" target="_blank"><FaIcons.FaYoutube className="text-dark mr-1" /> Youtube</A></li>
                            <li className="list-inline-item mr-5"><A href="https://www.linkedin.com/in/diego-velazquez-rabasa/" class="text-dark" target="_blank"><FaIcons.FaLinkedin className="text-dark mr-1" /> LinkedIn</A></li>
                            <li className="list-inline-item mr-5"><A href="https://dribbble.com/diegovr7" class="text-dark" target="_blank"><FaIcons.FaDribbble className="text-dark mr-1" /> Dribbble</A></li>
                            <li className="list-inline-item"><A href="https://www.behance.net/diegovr7" class="text-dark" target="_blank"><FaIcons.FaBehance className="text-dark mr-1" /> Behance</A></li>
                        </ul>
                    </Col>
                    <Col lg="6" className="text-right">
                        <p>© Templune 2020. Derechos Reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </div>
  );
}

export default Landing;
