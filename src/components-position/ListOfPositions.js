// Imports de react.
import React, {useEffect} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {TableFilter} from '../config-components/Filter'

// Imports de actions.
import * as positionActions from './reducer/positionActions'

// Icons
import * as FaIcons from "react-icons/fa"

const ListOfPositions = ({ title='Puestos', create='/create-position'}) => {
    const positionReducer = useSelector(state => state.positionReducer)
    const dispatch = useDispatch();
    const history = useHistory(); 
    const {companyId} = useParams();
    useEffect(() => {    
        dispatch(positionActions.positionMethods({companyId},'GetPositionsByCompanyId'))
    }, [dispatch, companyId])
    
    const getCompany = (positionId) => {
        history.push(`/admin-dashboard/company/${companyId}/update-position/${positionId}`)
    }

    const {
        api_actions: {cargando, error},
        list_positions
    } = positionReducer;

    return(
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}`} className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Puestos</small></li>
            </ul>
            <TableFilter 
                title={title}
                titlesTable={['Puesto','Acciones']}
                propertiesTable={['Name']}
                hrefCreate={`/admin-dashboard/company/${companyId}${create}`}
                bodyTable={list_positions}
                loading={cargando}
                error={error}
                actions={[
                    {action: 'Ver Puesto', handleAction: getCompany },
                ]}
            />
        </>
    )
}

export default ListOfPositions;

