import React from 'react'
import {useDispatch} from 'react-redux'
import {ModalForm, ModalDelete, SwitchSome} from '../config-components/Modals'
import Category from './Category'
import * as categoryActions from './reducer/categoryActions'
import * as FaIcons from "react-icons/fa"

export const CreateCategoryModal = ({category}) => {
    const dispatch = useDispatch()
    const categoryModal = SwitchSome();

    if(categoryModal.some){
        dispatch(categoryActions.categoryCleanState())
    }

    return (
        <ModalForm
            state={categoryModal}
            modalTitle={'Crear Recurso'}
            content={
                <Category 
                    category={category} 
                    hasSection={true}
                    setModal={categoryModal.toggle}
                />
            }
        ><FaIcons.FaPlusCircle className="" /></ModalForm>
    )
}

export const EditCategoryModal = ({category}) => {
    const categoryModal = SwitchSome();
    return (
        <ModalForm 
            //clean={this.cleanModal}
            state={categoryModal}
            modalTitle={`Editar Recurso: ${category.Name}`}
            content={<Category 
                categoryId={category.Id} 
                hasSection={true} 
                setModal={categoryModal.toggle}
            />}
        ><FaIcons.FaEdit className="mr-2" /></ModalForm>
    )
}

export const DeleteCategoryModal = ({category, action}) => {
    const categoryModal = SwitchSome();
    return (
        <ModalDelete 
            state={ categoryModal}
            modalTitle={`Eliminar Recurso: ${category.Name}`}
            content={`El siguiente Recurso "${category.Name}" se va eliminar. No se podra eliminar si está asignada a un producto.`}
            action={action}
        ><FaIcons.FaMinusCircle className="mr-2" /></ModalDelete>
    )
}
