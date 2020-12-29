import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {useSelector} from 'react-redux'
import {ListOfPersonDetails as PersonDetails, PersonDetail} from '../../components-personal-detail'
import {TemplateDashboardAdmin} from './Dashboard'

export const ListOfPersonDetails = ({reDirect, history}) =>{
    const companyReducer = useSelector(state => state.companyReducer)
    const { data: {TradeName}} = companyReducer
    return (
        <TemplateDashboardAdmin>
            <h2>Empresa: {TradeName}</h2>
            <PersonDetails reDirect={reDirect} history={history} />
        </TemplateDashboardAdmin>
    )
}

export const CreatePersonDetail = () => {
    const {companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <TemplateDashboardAdmin>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Crea un Empleado</h5>
                                <PersonDetail companyId={companyId} history={history} reDirect={`/admin-dashboard/company/${companyId}/employees`} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </TemplateDashboardAdmin>
        </>
    )
}

export const UpdatePersonDetail = () => {
    const {companyId, personalDetailId} = useParams();
    const history = useHistory();
    return (
        <>
            <TemplateDashboardAdmin>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Actualiza este Empleado</h5>
                                <PersonDetail personalDetailId={personalDetailId} companyId={companyId} history={history} reDirect={`/admin-dashboard/company/${companyId}/employees`} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </TemplateDashboardAdmin>
        </>
    )
}