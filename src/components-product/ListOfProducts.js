// Imports de react.
import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Imports de config-components.
import {TableFilter} from '../config-components/Filter'
import { Modals} from '../config-components'

// Icons
import * as FaIcons from "react-icons/fa"

// Imports de actions.
import * as productActions from './reducer/productActions'
const ListOfCategories = ({title = 'Productos',reDirect, categoryProductId}) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const productReducer = useSelector(state => state.productReducer)

    const {
        data: {
            Id,
            Name
        },
        api_actions: {cargando, error},
        list_products
    } = productReducer;

    useEffect(() => {
        debugger
        if(categoryProductId) {
            dispatch(productActions.productMethods({Id: categoryProductId},'GetProductsByCategoryId'))
        } else {
            dispatch(productActions.productMethods('','GetProducts'))
        }
    }, [dispatch, categoryProductId])

    const getProduct = (idProduct) => {
        history.push(`${reDirect}/${idProduct}`)
    }

    const openDeleteModal = async(idProduct) => {
        await dispatch(productActions.productMethods({Id: idProduct},'GetProduct'));
    }

    const deleteProduct = async() => {
        await dispatch(productActions.productMethods({Id},'DeleteProduct'));
        dispatch(productActions.productCleanState());
        await dispatch(productActions.productMethods('','GetProducts'));
    }

    const cleanProduct = async(cancel) => {
        await dispatch(productActions.productCleanState());
        !cancel && await dispatch(productActions.productMethods('','GetProducts'));
    }

    return(
        <>
        <ul className="list-inline mb-4">
        <li className="list-inline-item"><small><Link to="/admin-dashboard" className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
        <li className="list-inline-item "><small className="font-weight-bold">{title}</small></li>
    </ul>
            {Id 
                ?  <Modals.ModalOpenDelete 
                        content={`Se eliminara el siguiente producto: "${Name}" con Id: #${Id}`}
                        modalTitle={`Eliminar Producto ${Name}`}
                        action={deleteProduct}
                        clean={cleanProduct}
                    />
                : ''
            }
            <TableFilter 
                title={title}
                titlesTable={["#",'Nombre','Descripción','Acciones']}
                propertiesTable={['Id','Name','Description']}
                hrefCreate={'/admin-dashboard/create-product'}
                bodyTable={list_products}
                loading={cargando}
                error={error}
                actions={[
                    {action: 'Ver Producto', handleAction: getProduct },
                    {action: 'Eliminar Producto', handleAction: openDeleteModal }
                ]}
            />
        </>
    )   
}

export default ListOfCategories;
