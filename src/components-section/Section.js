// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as sectionActions from './reducer/sectionActions'

class Section extends Component {
    componentDidMount = async() =>{
        const {sectionId, sectionMethods} = this.props;
        sectionId && await sectionMethods({Id: sectionId}, 'get_section')
    }
    actionSection = async () => {
        const {
            sectionMethods, 
            sectionCleanState,
            sectionReducer: {data : {
                Id,
                Name,
                DateCreated,
                CourseId
            }},
            reDirect,
            history,
            courseId,
            setModal
        } = this.props
        if(Id){
            await sectionMethods({Id, Name, DateCreated, CourseId }, 'put_section')
        }else{
            await sectionMethods({ Name, CourseId: courseId}, 'post_section')
        }
        if(this.props.sectionReducer.data.Id){
            sectionCleanState()
            await sectionMethods({Id: courseId ? courseId : CourseId },'get_list_sections_by_course_id_with_products');
            setModal && setModal()
            reDirect && history.push(reDirect)
        }
    }
    render(){
        const {
            sectionHandleValidation,
            sectionHandleChange,
            sectionReducer: {
                data : {Id, Name},
                api_actions: {cargando, error},
                validations,
            }
        } = this.props;
        return(
            <>
            <Form1
                loading={cargando}
                error={error}
                action={this.actionSection}
                textButton={Id ? 'Actualizar Sección' : 'Agregar Sección'}
                textButtonLoading={Id ? 'Actualizando Sección...' : 'Agregando Sección...'}
                validations={validations}
                handleValidations={sectionHandleValidation}
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
                    onChange={sectionHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({sectionReducer}) => {
    return {sectionReducer}
}

const mapDispatchToProps = {
    ...sectionActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);