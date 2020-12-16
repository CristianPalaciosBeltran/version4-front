// Imports de react.
import React, {Component} from 'react'
import {Badge} from 'reactstrap'

// Import de components.
import CategoryProduct from './CategoryProduct'

// Imports de config-components.
import {ModalForm, ModalDelete} from '../config-components/Modals'


// Imports de actions.
import {connect } from 'react-redux'
import * as categoryProductActions from './reducer/categoryProductActions'
import {Loader, Error} from '../components-api/ApiResponses'

// Imports de Iconos.
import * as FaIcons from "react-icons/fa"

class ListOfCategoriesProducts extends Component {
    componentDidMount = async () => {
        const {categoryProductMethods} = this.props;
        await categoryProductMethods('','get_list_categories_products');
    }

    deleteAction = async (categoryProductId) => {
        const {categoryProductMethods, categoryProductCleanState} = this.props;
        await categoryProductMethods({Id: categoryProductId},'delete_category_product');
        categoryProductCleanState()
        await categoryProductMethods('','get_list_categories_products');
    }

    cleanModal = async () => {
        const {categoryProductMethods, categoryProductCleanState} = this.props;
        categoryProductCleanState()
        await categoryProductMethods('','get_list_categories_products');
    }

    render(){
        const {
            categoryProductReducer: { 
                api_actions: {cargando, error},
                list_categories_products
            }
        } = this.props;
        return(
            <>
                {cargando ? <Loader activate={cargando}></Loader> : ''}
                {list_categories_products.map(category => {
                    return <Badge color={'light'} className='d-inline-block mr-2 p-2'>
                        <span className='mr-2'>{category.Name} </span>
                        {/* <ModalForm 
                            key={category.Id}
                            clean={this.cleanModal}
                            modalTitle={`Editar Categoria: ${category.Name}`}
                            content={<CategoryProduct categoryProductId={category.Id}></CategoryProduct>}
                        ><FaIcons.FaEdit className="mr-2" /></ModalForm> */}
                        {/* <ModalDelete 
                            key={category.Id}
                            modalTitle={`Eliminar Categoría: ${category.Name}`}
                            content={`La siguiente categoría "${category.Name}" se va eliminar. No se podra eliminar si está asignada a un producto.`}
                            action={() => this.deleteAction(category.Id)}
                        ><FaIcons.FaMinusCircle className="mr-2" /></ModalDelete> */}
                     </Badge>
                   
                })}
                {error ? <Error message={error}></Error> : ''}
            </>
        )
    }
}

const mapStateToProps = ({categoryProductReducer}) => {
    return {categoryProductReducer}
}

const mapDispatchToProps = {
    ...categoryProductActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCategoriesProducts);