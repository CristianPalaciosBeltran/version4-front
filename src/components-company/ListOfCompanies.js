// Imports de react.
import React, {useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {TableFilter} from '../config-components/Filter'

// Imports de actions.
import * as companyActions from './reducer/companyActions'

// Icons
import * as FaIcons from "react-icons/fa"

const ListOfCompanies = ({ title='Empresas', create='/create-company'}) => {
    const companyReducer = useSelector(state => state.companyReducer)
    const dispatch = useDispatch();
    const history = useHistory(); 
    useEffect(() => {    
        dispatch(companyActions.companyMethods('','GetCompanies'))
    }, [dispatch])
    
    const getCompany = (companyId) => {
        history.push(`/admin-dashboard/company/${companyId}`)
    }

    const {
        api_actions: {cargando, error},
        list_companies
    } = companyReducer;

    return(
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to="/admin-dashboard" className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Empresas</small></li>
            </ul>
            <TableFilter 
                title={title}
                titlesTable={["#",'Empresa','Acciones']}
                propertiesTable={['Id','TradeName']}
                hrefCreate={`/admin-dashboard/user${create}`}
                bodyTable={list_companies}
                loading={cargando}
                error={error}
                actions={[
                    {action: 'Ver Empresa', handleAction: getCompany },
                ]}
            />
        </>
    )
}

export default ListOfCompanies;

