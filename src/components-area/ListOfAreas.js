// Imports de react.
import React, {useEffect} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {TableFilter} from '../config-components/Filter'

// Imports de actions.
import * as areaActions from './reducer/areaActions'

// Icons
import * as FaIcons from "react-icons/fa"

const ListOfAreas = ({ title='Areas y departamentos', create='/create-area'}) => {
    const areaReducer = useSelector(state => state.areaReducer)
    const dispatch = useDispatch();
    const history = useHistory(); 
    const {companyId} = useParams();
    useEffect(() => {    
        dispatch(areaActions.areaMethods({companyId},'GetAreasByCompanyId'))
    }, [dispatch, companyId])
    
    const getArea = (areaId) => {
        history.push(`/admin-dashboard/company/${companyId}/update-area/${areaId}`)
    }

    const {
        api_actions: {cargando, error},
        list_areas
    } = areaReducer;

    return(
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}`} className="text-muted">mis indicadores</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Puestos</small></li>
            </ul>
            <TableFilter 
                title={title}
                titlesTable={['Nombre', 'Tipo' ,'Acciones']}
                propertiesTable={['Name', 'Type']}
                hrefCreate={`/admin-dashboard/company/${companyId}${create}`}
                bodyTable={list_areas}
                loading={cargando}
                error={error}
                actions={[
                    {action: 'Ver Area', handleAction: getArea },
                ]}
            />
        </>
    )
}

export default ListOfAreas;

