// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'


// Imports de actions.
import {connect } from 'react-redux'
import * as categoryProductActions from './reducer/categoryProductActions'

class CategoryProduct extends Component {
    componentDidMount = async() =>{
        const {categoryProductId, categoryProductMethods} = this.props;
        categoryProductId && await categoryProductMethods({Id: categoryProductId}, 'get_category_product')
    }
    actionCategoryProduct = async () => {
        const {
            categoryProductMethods, 
            categoryProductCleanState,
            categoryProductReducer: {data : {
                Id,
                Name
        }}} = this.props
        if(Id){
            await categoryProductMethods({Id: Id, Name: Name}, 'put_category_product')

        }else{
            await categoryProductMethods({Name: Name}, 'post_category_product')
        }
        if(this.props.categoryProductReducer.data.Id){
            categoryProductCleanState()
            await categoryProductMethods('','get_list_categories_products');
        }
    }
    render(){
        const {
            categoryProductHandleValidation,
            categoryProductHandleChange,
            categoryProductReducer: {
                data : {Id, Name},
                api_actions: {cargando, error},
                validations,
            }
        } = this.props;
        return(
            <Form1
                loading={cargando}
                error={error}
                action={this.actionCategoryProduct}
                textButton={Id ? 'Actualizar Categoría' : 'Agregar Categoría'}
                textButtonLoading={Id ? 'Actualizando Categoría...' : 'Agregando Categoría...'}
                validations={validations}
                handleValidations={categoryProductHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Categoria de producto'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'Name'}
                    placeHolder={'Introduce una Categoría'}
                    inputValue={Name}
                    onChange={categoryProductHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
            </Form1>
        )
    }
}

const mapStateToProps = ({categoryProductReducer}) => {
    return {categoryProductReducer}
}

const mapDispatchToProps = {
    ...categoryProductActions
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct);