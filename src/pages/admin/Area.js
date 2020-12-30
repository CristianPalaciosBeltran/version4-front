import {ListOfAreas as Areas, Area} from '../../components-area'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {useSelector} from 'react-redux'
import {useHistory, useParams, Link} from 'react-router-dom'
import {TemplateDashboardAdmin} from './Dashboard'
import * as FaIcons from "react-icons/fa"


export const ListOfAreas = ({reDirect, history}) =>{
    const companyReducer = useSelector(state => state.companyReducer)
    const { data: {TradeName}} = companyReducer
    return (
        <TemplateDashboardAdmin>
        <h2>Empresa: {TradeName}</h2>

            <Areas reDirect={reDirect} history={history} />
        </TemplateDashboardAdmin>
    )
}


export const CreateArea = () => {
    const {companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <TemplateDashboardAdmin>
                <ul className="list-inline mb-4">
                    <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}/areas`} className="text-muted">Areas</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item "><small className="font-weight-bold"> Crear Area</small></li>
                </ul>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Crea un Puesto</h5>
                                <Area companyId={companyId} history={history} reDirect={`/admin-dashboard/company/${companyId}/areas`} />
                            </CardBody>
                        </Card>
                    </Col>
                    
                </Row>
            </TemplateDashboardAdmin>
        </>
    )
}

export const UpdateArea = () => {
    const {companyId, areaId} = useParams();
    const history = useHistory();
    return (
        <>
            <TemplateDashboardAdmin>
            <ul className="list-inline mb-4">
                    <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}/areas`} className="text-muted">Areas</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item "><small className="font-weight-bold"> Actualizar Area</small></li>
                </ul>
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Actualiza esta area</h5>
                                <Area areaId={areaId} companyId={companyId} history={history} reDirect={`/admin-dashboard/company/${companyId}/areas`} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </TemplateDashboardAdmin>
        </>
    )
}
