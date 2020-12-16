// Imports de react.
import React, {useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {TableFilter} from '../config-components/Filter'

// Imports de actions.
import * as adminActions from './reducer/adminActions'

// Icons
import * as FaIcons from "react-icons/fa"

const ListOfUsers = ({roleName = 'User', title='Usuarios', create='/create-user'}) => {
    const adminReducer = useSelector(state => state.adminReducer)
    const dispatch = useDispatch();
    const history = useHistory(); 
    useEffect(() => {    
        dispatch(adminActions.adminMethods({roleName: roleName},'GetUsersInfo'))
    }, [dispatch, roleName])
    
    const getUser = (userId) => {
        let typeUser = roleName === 'User' ? 'user' : 'admin'
        history.push(`/admin-dashboard-read-${typeUser}/${userId}`)
    }

    const {
        api_actions: {cargando, error},
        list_users
    } = adminReducer;

    return(
        <>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to="/admin-dashboard" className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Usuarios</small></li>
            </ul>
            <TableFilter 
                title={title}
                titlesTable={["#",'Usuario','Acciones']}
                propertiesTable={['Id','UserName']}
                hrefCreate={`/admin-dashboard${create}`}
                bodyTable={list_users}
                loading={cargando}
                error={error}
                actions={[
                    {action: 'Ver Usuario', handleAction: getUser },
                ]}
            />
        </>
    )
}

export default ListOfUsers;

