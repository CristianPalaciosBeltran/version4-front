
import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { CompanyIndicators, Company, ChooseCompany } from '../../components-company'
import { Row, Col, Card, CardBody } from 'reactstrap'

export const Indicators = ({user, companyId, hrefBase}) => {
    debugger
    return (
        <>
            <ChooseCompany user={user} companyId={companyId}> </ChooseCompany>
            <Row className="mb-4">
                <CompanyIndicators companyId={companyId} hrefBase={hrefBase}/>
            </Row>
        </>
    )
}

export const CreateCompany = () => {
    const {userId} = useParams();
    const history = useHistory();
    return (
        <>
            <Col lg="6">
                <Card className="border-0">
                    <CardBody className="card-body">
                        <h5 className="font-weight-bold mb-3">Crea una Empresa</h5>
                        <Company userId={userId} history={history} reDirect={'/admin-dashboard/company'} />
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

