import React from 'react'
import {useDispatch} from 'react-redux'
import {ModalForm, ModalDelete, SwitchSome} from '../config-components/Modals'
import Section from './Section'
import * as sectionActions from './reducer/sectionActions'
import * as FaIcons from "react-icons/fa"

export const CreateModalSection = ({courseId}) => {
    const dispatch = useDispatch()
    const sectionModal = SwitchSome();
   
    if(sectionModal.some){
        dispatch(sectionActions.sectionCleanState())
        dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products'))
    }
    
    return (
        <ModalForm
            state={sectionModal}
            modalTitle={'Crear Sección'}
            content={
                <Section 
                    courseId={courseId}
                    setModal={ sectionModal.toggle}
                />
            }
        ><FaIcons.FaPlusCircle className="" /></ModalForm>
    )
}

export const EditSectionModal = ({section}) => {
    const sectionModal = SwitchSome();
    return (
        <ModalForm 
            state={sectionModal}
            modalTitle={`Editar Sección: ${section.SectionName}`}
            content={<Section sectionId={section.SectionId} />}
        ><FaIcons.FaEdit className="mr-2" /></ModalForm>
    )
}

export const DeleteSectionModal = ({section, courseId}) => {
    const dispatch = useDispatch()
    const sectionModal = SwitchSome();
    const deleteSectionAction = async (sectionId) => {
        await dispatch(sectionActions.sectionMethods({Id: sectionId},'delete_section'));
        await dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products'));
    }
    
    return (
        <ModalDelete 
            state={sectionModal}
            modalTitle={`Eliminar Sección: ${section.SectionName}`}
            content={`La siguiente sección "${section.SectionName}" se va eliminar. No se podra eliminar si está asignada a un producto.`}
            action={() => deleteSectionAction(section.SectionId)}
        ><FaIcons.FaMinusCircle className="mr-2" /></ModalDelete>
    )
}