import {Position, ListOfPositions as Positions, ListFromPositions} from '../../components-position'
import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {AdminDashboardPages} from './'

export const ListOfPositions = ({reDirect, history}) =>{
    const companyReducer = useSelector(state => state.companyReducer)
    const { data: {TradeName}} = companyReducer
    return (
        <AdminDashboardPages.TemplateDashboardAdmin>
        <h2> {TradeName}</h2>

            <Positions reDirect={reDirect} history={history} />
        </AdminDashboardPages.TemplateDashboardAdmin>
    )
}

export const CreatePosition = () => {
    const {companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Crea un Puesto</h5>
                                <Position companyId={companyId} history={history} reDirect={`/admin-dashboard/company/${companyId}/positions`} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Responsabilidades</h5>
                                <ListFromPositions.ListOfResponsabilities /> 
                                <h5 className="font-weight-bold mb-3">Descripciones</h5>
                                <ListFromPositions.ListOfDescriptions />     
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}

export const UpdatePosition = () => {
    const {companyId, positionId} = useParams();
    const history = useHistory();
    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Actualiza este Puesto</h5>
                                <Position positionId={positionId} companyId={companyId} history={history} reDirect={`/admin-dashboard/company/${companyId}/positions`} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Responsabilidades</h5>
                                <ListFromPositions.ListOfResponsabilities />
                                <h5 className="font-weight-bold mb-3">Competencias</h5>
                                <ListFromPositions.ListOfDescriptions />
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}
