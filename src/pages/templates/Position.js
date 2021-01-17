import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {Position, ListOfPositions as Positions, ListFromPositions} from '../../components-position'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {
    Col,Card, CardBody
} from 'reactstrap'

import * as FaIcons from "react-icons/fa"


export const ListOfPositions = ({reDirect, reDirectBase, reDirectCreate,  history}) =>{
    const {companyId} = useParams();
    const companyReducer = useSelector(state => state.companyReducer)
    const { data: {TradeName}} = companyReducer
    debugger
    return (
        <>
            <h2> {TradeName}</h2>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={reDirectBase.replace('companyId', companyId)} className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Posiciones</small></li>
            </ul>
            <Positions reDirect={reDirect} create={reDirectCreate}  history={history} />
        </>
    )
}

export const CreatePosition = ({reDirect, reDirectBase}) => {
    const history = useHistory();
    const {companyId, positionId} = useParams();
    debugger

    return (
        <>
            
            <Col lg="6" className='mb-5'>
                <Card className="border-0">
                    <CardBody className="card-body">
                        <h5 className="font-weight-bold mb-3">{!positionId ? 'Crear Puesto' : 'Guardar Puesto'}</h5>
                        <Position 
                            positionId={positionId} 
                            companyId={companyId} 
                            history={history} 
                            reDirect={reDirect.replace('companyId', companyId)} />
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
        </>
    )
}

