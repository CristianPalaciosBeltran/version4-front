// Imports de react.
import React from 'react';
import {Link} from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, } from 'reactstrap';

// Imports de config-components.
import {Navbars} from '../../config-components/Navbars'
import Example from '../../config-components/Tabs'

import { A, AWhatsapp } from '../../config-components'
// } from 'components-links'

// Imports de assets.
import Blog from '../../img/test.jpg'
import Heroxs from '../../img/hero-xs.png'
import { ImgOrganigrama, ImgPuestos, ImgDescripciones} from '../../img'
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
                        <h1 className="display-4 font-weight-bold mb-3">Somos expertos en Organización empresarial.</h1>
                        <p className="text-muted mb-4">Creamos la Organización en tu empresa con las mejores herramientas tecnologicas, tenemos más de 40 años de experiencia</p>
                        
                    </Col>
                </Row>
                <img src={Heroxs} className="img-fluid d-block d-md-none mt-5" />
            </Container>
        </section>

        <section>
            <Container>
                <Row className="py-6">
                    <Col lg="6">
                      <ImgOrganigrama className="img-fluid rounded my-4" />
                    </Col>
                    <Col lg="6" className="d-flex">
                        <div className="align-self-center p-4">
                            <h2 className="display-4 font-weight-bold mb-4">Organigrama<span className="text-primary">.</span></h2>
                            <p className="text-muted mb-4">Una buena implementación de la Organización es conocer en detalle los roles que ejercen tus colaboradores.</p>
                            
                        </div>
                    </Col>
                </Row>
                <Row className="py-6">
                    <Col lg="6" className="d-flex">
                        <div className="align-self-center p-4">
                            <h2 className="display-4 font-weight-bold mb-4">Puestos<span className="text-primary">.</span></h2>
                            <p className="text-muted mb-4">Tener definidos los puestos de tu empresa es indispensable para crecer en un mercado cada vez más competitivo. </p>
                            
                        </div>
                    </Col>
                    <Col lg="6">
                        <ImgPuestos src={WebApps} className="img-fluid rounded my-4" />
                    </Col>
                </Row>
                <Row className="py-6">
                    <Col lg="6">
                      <ImgDescripciones className="img-fluid rounded my-4" />
                    </Col>
                    <Col lg="6" className="d-flex">
                        <div className="align-self-center p-4">
                            <h2 className="display-4 font-weight-bold mb-4">Compesaciones<span className="text-primary">.</span></h2>
                            <p className="text-muted mb-4">Define claramente tus procesos y logra sitematizarlos</p>
                           
                        </div>
                    </Col>
                </Row>
                <Row className="py-6">
                    <Col lg="6" className="d-flex">
                        <div className="align-self-center p-4">
                            <h2 className="display-4 font-weight-bold mb-4">Procesos<span className="text-primary">.</span></h2>
                            <p className="text-muted mb-4">Tener definidos los puestos de tu empresa es indispensable para crecer en un mercado cada vez más competitivo. </p>
                           
                        </div>
                    </Col>
                    <Col lg="6">
                        <img src={WebApps} className="img-fluid rounded my-4" />
                    </Col>
                </Row>
            </Container>
        </section>  
        
        {/* <section className="py-6">
            <Container>
                <div className="tab-container bg-light py-4 px-5">
                    <Example />
                </div>
            </Container>
        </section>    */}
       
        {/* <section className="py-7">
            <Container>
                <div className="w-75 mx-auto text-center mb-5">
                    <h2 className="display-4 font-weight-bold">
                        <AWhatsapp 
                            phone='+525533333279' 
                            message={`Hola, Quiero información para un proyecto`} 
                            className="text-dark"
                        >Contáctanos ahora</AWhatsapp>
                    </h2>
                    <p className="lead text-muted">Comienza  y empieza a mejorar tu empresa.</p>
                </div>
            </Container>
        </section> */}
        <footer className="py-3">
            <Container>
                <Row>
                    <Col lg="6">
                        <ul className="list-unstyled">
                            <li className="list-inline-item mr-5"><Link class="text-dark" ><FaIcons.FaLinkedin className="text-dark mr-1" /> Linkedin</Link></li>
                            
                        </ul>
                    </Col>
                    <Col lg="6" className="text-right">
                        <p>© Version 4 2020. Derechos Reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </div>
  );
}

export default Landing;
