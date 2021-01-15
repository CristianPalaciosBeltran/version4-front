import {ListOfAreas as Areas, Area} from '../../components-area'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {useSelector} from 'react-redux'
import {useHistory, useParams, Link} from 'react-router-dom'
import * as FaIcons from "react-icons/fa"

export const ListOfAreas = ({redirectUser}) =>{
    const history = useHistory();

    const companyReducer = useSelector(state => state.companyReducer)
    const { data: {TradeName}} = companyReducer
    return (
        <>
            <h2>{TradeName}</h2>
            <Areas redirectUser={redirectUser} history={history} />
        </>
    )
}

export const CreateArea = ({redirectUser}) => {
    const areaReducer = useSelector(state => state.areaReducer);
    const {data: {Id}}= areaReducer;
    const {companyId, areaId} = useParams();
    const history = useHistory();
    return (
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`${redirectUser}/company/${companyId}/areas`} className="text-muted">Areas</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">{!Id ? 'Crear Area' : 'Actualizar Area'} </small></li>
            </ul>
            <Row>
                <Col lg="6">
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <h5 className="font-weight-bold mb-3">Crea un Puesto</h5>
                            <Area  areaId={areaId} companyId={companyId} history={history} reDirect={`${redirectUser}/company/${companyId}/areas`} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

