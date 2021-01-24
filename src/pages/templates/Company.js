
import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { CompanyIndicators, Company } from '../../components-company'
import { Row, Col, Card, CardBody } from 'reactstrap'

export const Indicators = ({companyName, companyId, hrefBase}) => {
    return (
        <>
            <h2> {companyName}</h2>
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