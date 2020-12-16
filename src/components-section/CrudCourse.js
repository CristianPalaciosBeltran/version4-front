// Imports de react.
import React from 'react'

// Imports de components.
import {CreateModalSection} from './ModalSections'
import {ListOfSections} from './ListOfSections'
import {CreateProductModal} from  '../components-product/ModalProducts'

// Imports de actions.
import * as sectionActions from './reducer/sectionActions'

export const CrudCourse = ({courseId}) => {

    
    return(
        <>
        <div className='d-flex justify-content-between'>
            <h5 className="font-weight-bold mb-3">Crea una sección nueva a tu curso</h5>
            <CreateModalSection courseId={courseId}/>
        </div> 

            <div className='d-flex justify-content-between'>
            <h6 className="font-weight-bold mb-3">Añade videos o documentos a tus secciones</h6>
            <CreateProductModal courseId={courseId}/>
        </div>       
        <ListOfSections courseId={courseId}></ListOfSections>
        </>
    )
}
