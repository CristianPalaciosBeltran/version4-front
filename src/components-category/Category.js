// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'


// Imports de actions.
import {connect } from 'react-redux'
import * as categoryActions from './reducer/categoryActions'
class Category extends Component {
    componentDidMount = async() =>{
        const {categoryId, categoryMethods} = this.props;
        categoryId && await categoryMethods({Id: categoryId}, 'GetCategory')
    }
    actionCategory = async () => {
        const {
            categoryMethods, 
            categoryCleanState,
            categoryReducer: {data : {
                Id,
                Name
        }}} = this.props
        if(Id){
            await categoryMethods({Id: Id, Name: Name}, 'PutCategory')

        }else{
            await categoryMethods({Name: Name}, 'PostCategory')
        }
        if(this.props.categoryReducer.data.Id){
            categoryCleanState()
            await categoryMethods('','GetCategories');
        }
    }
    render(){
        const {
            categoryHandleValidation,
            categoryHandleChange,
            categoryReducer: {
                data : {Id, Name},
                api_actions: {cargando, error},
                validations,
            }
        } = this.props;
        return(
            <Form1
                loading={cargando}
                error={error}
                action={this.actionCategory}
                textButton={Id ? 'Actualizar Categoría' : 'Agregar Categoría'}
                textButtonLoading={Id ? 'Actualizando Categoría...' : 'Agregando Categoría...'}
                validations={validations}
                handleValidations={categoryHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Añade caracteristicas para seleccionar en los proyectos'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'Name'}
                    placeHolder={'Introduce una Categoría'}
                    inputValue={Name}
                    onChange={categoryHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
            </Form1>
        )
    }
}

const mapStateToProps = ({categoryReducer}) => {
    return {categoryReducer}
}

const mapDispatchToProps = {
    ...categoryActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);