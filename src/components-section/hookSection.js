// Imports de react.
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import * as sectionActions from './reducer/sectionActions'

export const Section = ({sectionId, courseId, history, reDirect, setModal}) => {

    const sectionReducer = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch()
    
    useEffect( () => {
        sectionId && dispatch(sectionActions.sectionMethods({Id: sectionId}, 'get_section'))
       
    }, [dispatch, sectionId])
     
    const {
        data : {Id, Name, DateCreated},
        api_actions: {cargando, error},
        validations,
    } =  sectionReducer;

    const actionSection = async () => {
        if(Id){
            await dispatch(sectionActions.sectionMethods({Id, Name : 'imagenes 2', DateCreated, CourseId: courseId }, 'put_section')) 
        }else{
            await dispatch(sectionActions.sectionMethods({ Name, CourseId: courseId}, 'post_section')) 
        }
        if(sectionReducer.data.Id){
            dispatch(sectionActions.sectionCleanState()) 
            await dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products')) ;
            setModal && setModal()
            reDirect && history.push(reDirect)
        }
    }

    const SectionHandleChange = (e, validationRE) => {
        dispatch(sectionActions.sectionHandleChange(e, validationRE))
    }

    return(
        <>
        <Form1
            loading={cargando}
            error={error}
            action={actionSection}
            textButton={Id ? 'Actualizar Sección' : 'Agregar Sección'}
            textButtonLoading={Id ? 'Actualizando Sección...' : 'Agregando Sección...'}
            validations={validations}
            handleValidations={'sectionHandleValidation'}
        >
            <InputText 
                classLabel='font-weight-bold'
                textLabel='Sección'
                isMandatory='*'
                classMandatory=''
                inputType='text'
                inputName={'Name'}
                placeHolder={'Introduce una Sección'}
                inputValue={Name}
                onChange={SectionHandleChange}
                maxLength={50}
                RE={RE_EMPTY}
                validateRE={validations.Name}
            />
        </Form1>
        </>
    )
}