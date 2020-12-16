import React from 'react'
import {useDispatch} from 'react-redux'
import {ModalForm, ModalDelete, SwitchSome} from '../config-components/Modals'
import Product from './Product'
import * as productActions from './reducer/productActions'
import * as FaIcons from "react-icons/fa"

export const CreateProductModal = ({courseId}) => {
    const dispatch = useDispatch()
    const porductModal = SwitchSome();

    if(porductModal.some){
        dispatch(productActions.productCleanState())
    }

    return (
        <ModalForm
            state={porductModal}
            modalTitle={'Crear Recurso'}
            content={
                <Product 
                    courseId={courseId} 
                    hasSection={true}
                    setModal={porductModal.toggle}
                />
            }
        ><FaIcons.FaPlusCircle className="" /></ModalForm>
    )
}

export const EditProductModal = ({product, courseId}) => {
    const porductModal = SwitchSome();
    return (
        <ModalForm 
            //clean={this.cleanModal}
            state={porductModal}
            modalTitle={`Editar Recurso: ${product.Name}`}
            content={<Product 
                productId={product.Id} 
                hasSection={true} 
                courseId={courseId}
                setModal={porductModal.toggle}
            />}
        ><FaIcons.FaEdit className="mr-2" /></ModalForm>
    )
}

export const DeleteProductModal = ({product, action}) => {
    const porductModal = SwitchSome();
    return (
        <ModalDelete 
            state={ porductModal}
            modalTitle={`Eliminar Recurso: ${product.Name}`}
            content={`El siguiente Recurso "${product.Name}" se va eliminar. No se podra eliminar si está asignada a un producto.`}
            action={action}
        ><FaIcons.FaMinusCircle className="mr-2" /></ModalDelete>
    )
}