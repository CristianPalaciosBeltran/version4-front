// Imports de react.
import React from 'react' 
import {useHistory, useParams} from 'react-router-dom'
import {Card, CardBody, Row, Col} from 'reactstrap'

// Imports de components.
import {ListOfCourses as Courses, Course, PlayerMedia} from '../../components-course'

// Imports de pages.
import {TemplateDashboardAdmin} from './Dashboard'

export const ListOfCourses = ({reDirect, history}) =>{
    return (
        <Courses reDirect={reDirect} history={history} />
    )
}

export const CreateCourse = () => {
    const history = useHistory();
    return (
        <Card className="border-0">
            <CardBody className="card-body">
                <h5 className="font-weight-bold mb-3">Crea un curso nuevo</h5>
                <Course reDirect={'/admin-dashboard/section/'} history={history}/>
            </CardBody>
        </Card>
    )
}

export const WhatchCourse = () => {
    return (
        <>
            <PlayerMedia.WatchClass /> 
        </>
    )
}

export const EditCourse = () => {
    const history = useHistory();
    const {courseId} = useParams();
    return (
        <TemplateDashboardAdmin>
             <Row>
                <Col >
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <h5 className="font-weight-bold mb-3">Edita este Curso </h5>
                            <Course reDirect={'/admin-dashboard/courses'} history={history} courseId={courseId}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TemplateDashboardAdmin>
    )
}