import React from 'react'
import {Row, Col, Card, CardBody, Container} from 'reactstrap'
import {useHistory, useParams, Link} from 'react-router-dom'
import {ListOfUsers as Users, UpdateUserInfo, ValidateAccount} from '../../components-admin'
import {SignUp, ChangePasswordForUser} from '../../components-session/'
import {Navbars} from '../../config-components'

// Icons
import * as FaIcons from "react-icons/fa"

export const ListOfUsers = () => {
    return (
        <>
            <Users />
        </>
    )
}

export const ListOfAdmins = () => {
    return (
        <>
            <Users 
                roleName='Admin' 
                title='Administradores'
                create='/create-admin'
            />
        </>
    )
}

export const CreateAdmin = () => {
    const history = useHistory();
    return (
        <>
            <Row>
                <Col lg="6">
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <h5 className="font-weight-bold mb-3">Crea un Administrador</h5>
                            <SignUp history={history} role='Admin' reDirect={'/admin-dashboard/admins'} token={true}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
               
        </>
    )
}

export const ReadAdmin = () => {
    const {userId} = useParams()
    return (
        <>
            <Navbars.NavbarAdmin />
            <section className="bg-light h-100 py-6">
                <Container>
                    <Row>
                        <Col lg="6">
                            <Card className="border-0">
                                <CardBody className="card-body">
                                    <h5 className="font-weight-bold mb-3">Admin</h5>
                                    <UpdateUserInfo userId={userId}></UpdateUserInfo>
                                    <ValidateAccount />
                                    <ChangePasswordForUser />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
             </Container>
            </section>
        </>
    )
}

export const CreateUser = () => {
    const history = useHistory();
    return (
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to="/admin-dashboard" className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item"><small><Link to="/admin-dashboard/users" className="text-muted">Usuarios</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Crear usuario</small></li>
            </ul>
            <Row>
                <Col lg="6">
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <h5 className="font-weight-bold mb-3">Crea un Usuario</h5>
                            <SignUp history={history} role='User' reDirect={'/admin-dashboard/users'} token={true}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export const ReadUser = () => {
    const {userId} = useParams()
    return (
        <>
            <Navbars.NavbarAdmin />
            <section className="bg-light h-100 py-6">
                <Container>
                    <Row>
                        <Col lg="6">
                            <Card className="border-0">
                                <CardBody className="card-body">
                                    <h5 className="font-weight-bold mb-3">Usuario</h5>
                                    <UpdateUserInfo userId={userId}></UpdateUserInfo>
                                    <ValidateAccount />
                                    <ChangePasswordForUser userId={userId}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
