// Imports de react.
import React from 'react' 
import { useParams} from 'react-router-dom'
import {Card, CardBody, Row, Col} from 'reactstrap'

// Imports de components.
import {CrudCourse} from '../../components-section'


// Imports de pages.
import {TemplateDashboardAdmin} from './Dashboard'

export const CreateSection = () => {
    const {courseId} = useParams();
    return (
        <TemplateDashboardAdmin>
            <Row>
                <Col lg="8">
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <CrudCourse  courseId={courseId} ></CrudCourse>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TemplateDashboardAdmin>
    )
}

export const EditCourse = () => {
    return (
        <TemplateDashboardAdmin>
             <Row>
                <Col >
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <h5 className="font-weight-bold mb-3">Edita este Curso </h5>
                            {/* <Course reDirect={'/admin-dashboard/courses'} history={history} courseId={courseId}/> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TemplateDashboardAdmin>
    )
}