// Imports de react.
import React, {useEffect} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {TableFilter} from '../config-components/Filter'

// Imports de actions.
import * as personalDetailActions from './reducer/personalDetailActions'

// Icons
import * as FaIcons from "react-icons/fa"

const ListOfPersonalDetails = ({ title='Empleados', create='/create-personal-detail'}) => {
    const personalDetailReducer = useSelector(state => state.personalDetailReducer)
    const dispatch = useDispatch();
    const history = useHistory(); 
    const {companyId} = useParams();
    useEffect(() => {    
        dispatch(personalDetailActions.personalDetailMethods({companyId},'GetPersonalDetailsByCompanyId'))
    }, [dispatch, companyId])
    
    const getCompany = (personalDetailId) => {
        history.push(`/admin-dashboard/company/${companyId}/update-personal-detail/${personalDetailId}`)
    }

    const {
        api_actions: {cargando, error},
        list_personal_details
    } = personalDetailReducer;

    return(
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}`} className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Empleados</small></li>
            </ul>
            <TableFilter 
                title={title}
                titlesTable={['Nombre', 'Apellido Paterno','Apellido Materno','Acciones']}
                propertiesTable={['Name', 'LastName', 'SecondLastName']}
                hrefCreate={`/admin-dashboard/company/${companyId}${create}`}
                bodyTable={list_personal_details}
                loading={cargando}
                error={error}
                actions={[
                    {action: 'Ver Empleado', handleAction: getCompany },
                ]}
            />
        </>
    )
}

export default ListOfPersonalDetails;

