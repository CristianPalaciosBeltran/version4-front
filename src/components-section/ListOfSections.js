// Imports de react.
import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Badge} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux'

// Import de components.
import {EditSectionModal, DeleteSectionModal} from './ModalSections'
import {EditProductModal, DeleteProductModal} from '../components-product/ModalProducts'

// Imports de actions.
import * as sectionActions from './reducer/sectionActions'
import * as productActions from '../components-product/reducer/productActions'

import {Loader, Error} from '../components-api/ApiResponses'

// Imports de Iconos.
import * as FaIcons from "react-icons/fa"

export const ListOfSections = ({courseId}) => {

    const dispatch = useDispatch();
    const sectionReducer = useSelector(state => state.sectionReducer);

    
    useEffect(() => {
        dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products'))
    }, [dispatch, courseId])

    const cleanSection = () => {
        dispatch(sectionActions.sectionCleanState())
        dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products'))
    }

    const deleteProductAction = (sectionId) => {
        dispatch(productActions.productMethods({Id: sectionId},'delete_product'))
        dispatch(productActions.productCleanState())
        cleanSection()
    }

    const {
        api_actions: {cargando, error},
        list_sections
    } = sectionReducer;

    // if(list_sections.len){
    //     dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products'))
    // }

    return(
        <>
            {cargando ? <Loader activate={cargando}></Loader> : ''}
            {list_sections.map(section => {
                 //TODO: implementar nuevo formato para leer lor recursos de de una seción
                 //TODO: Crear reducers de resources.
                return <>
                    <div className="border mb-3 p-2">
                        <div className='d-flex mb-2 p-2 text-left'>
                            <h6 className='flex-grow-1 font-weight-bold mb-0'>{section.SectionName} </h6>
                            <div>
                                <EditSectionModal section={section} cleanSection={cleanSection}/>
                                <DeleteSectionModal section={section} courseId={courseId}/>
                            </div>
                        </div>
                    {
                        section.Products && 
                        section.Products.map(product => {
                        if(product !== null){
                        return(
                            <Badge color={'light'} className='d-flex mb-2 p-2 text-left'>
                                <p className='flex-grow-1 mb-0'>{product.Name} </p>
                                <div>
                                    <Link to={`/player/watch-class/${product.Id}/${courseId}`}>
                                    <FaIcons.FaEye className="mr-2" />
                                    </Link>
                                    <EditProductModal product={product} courseId={courseId} />
                                    <DeleteProductModal product={product} action={() => deleteProductAction(product.Id)}/>
                                </div>
                            </Badge>
                            )
                        }
                        return '';
                        })
                    }
                    </div>
                </>
            })}
            {error ? <Error message={error}></Error> : ''}
        </>
    )
}

