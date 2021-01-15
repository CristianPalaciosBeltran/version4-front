import React from 'react'
import {useHistory, useParams, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {ListOfPersonDetails as PersonDetails, PersonDetail} from '../../components-personal-detail'
import * as FaIcons from "react-icons/fa"
import {JobDetails} from './'


export const ListOfPersonDetails = ({ redirectUser }) =>{
    const history = useHistory();
    const companyReducer = useSelector(state => state.companyReducer)
    const { data: {TradeName}} = companyReducer
    return (
        <>
            <h2> {TradeName}</h2>
            <PersonDetails redirectUser={redirectUser}  history={history} />
        </>
    )
}

// Alt + z
export const CreatePersonDetail = ({redirectUser}) => {
    const personalDetailReducer = useSelector(state => state.personalDetailReducer);
    const {data: {Id}}= personalDetailReducer;
    const {companyId, personalDetailId} = useParams();
    const history = useHistory();
    return (
        <>
                <ul className="list-inline mb-4">
                    <li className="list-inline-item"><small><Link to={`${redirectUser}/company/${companyId}/employees`} className="text-muted">Empleados</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item "><small className="font-weight-bold"> {!Id ? 'Crear Empleado' : 'Actualizar Empleado'}</small></li>
                </ul>
                <Row>
                    <Col lg="6" className='mb-5'>
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">{!Id ? 'Crea un Empleado' : 'Actualizar Empleado'}</h5>
                                <PersonDetail personalDetailId={personalDetailId} companyId={companyId} history={history} reDirect={`${redirectUser}/company/${companyId}/update-personal-detail`} />
                            </CardBody>
                        </Card>
                    </Col>
                    {Id ? <JobDetails.CreateJobDetail personalDetailId={personalDetailId}/> : '' }
                </Row>
        </>
    )
}
