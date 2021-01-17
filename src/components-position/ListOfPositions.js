// Imports de react.
import React, {useEffect} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {TableFilter} from '../config-components/Filter'

// Imports de actions.
import * as positionActions from './reducer/positionActions'

const ListOfPositions = ({ title='Posiciones', reDirect='', create='/create-position'}) => {
    const positionReducer = useSelector(state => state.positionReducer)
    const dispatch = useDispatch();
    const history = useHistory(); 
    const {companyId} = useParams();
    useEffect(() => {    
        dispatch(positionActions.positionMethods({companyId},'GetPositionsByCompanyId'))
    }, [dispatch, companyId])
    
    const getCompany = (positionId) => {
        //history.push(`/admin-dashboard/company/${companyId}/update-position/${positionId}`)
        history.push(reDirect.replace('positionId', positionId).replace('companyId', companyId))
    }

    const {
        api_actions: {cargando, error},
        list_positions
    } = positionReducer;

    return(
        <>
            
            <TableFilter 
                title={title}
                titlesTable={['Puesto','Acciones']}
                propertiesTable={['Name']}
                //hrefCreate={`/admin-dashboard/company/${companyId}${create}`}
                hrefCreate={create.replace('companyId', companyId)}
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

