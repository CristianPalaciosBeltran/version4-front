import React from 'react'
import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {
    Col,Card, CardBody
} from 'reactstrap'
import { JobDetails} from '../../components-job-detail'




export const CreateJobDetail = ({ reDirect=''}) => {
    const {personalDetailId} = useParams();
    const history = useHistory();

    const jobDetailReducer = useSelector(state => state.jobDetailReducer);
    const {data: {Id}} = jobDetailReducer;
    
    return (
        <>
            <Col lg="6">
                <Card className="border-0">
                    <CardBody className="card-body">
                        <h5 className="font-weight-bold mb-3">{!Id ? 'Crea Información Laboral del Empleado' : 'Actualiza Información Laboral del Empleado'}</h5>
                        <JobDetails personalDetailId={personalDetailId} history={history} reDirect={reDirect} />
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export const UpdateJobDetail = ({reDirect=''}) => {
    const {personalDetailId} = useParams();
    const history = useHistory();
    return (
        <>            
            <Col lg="6">
                <Card className="border-0">
                    <CardBody className="card-body">
                        <h5 className="font-weight-bold mb-3">Actualiza Información Laboral del Empleado</h5>
                        <JobDetails personalDetailId={personalDetailId}  history={history} reDirect={reDirect} />
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}