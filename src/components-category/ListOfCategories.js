// Imports de react.
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Badge} from 'reactstrap'

// Import de components.
import {EditCategoryModal, DeleteCategoryModal} from './ModalCategory'


// Imports de actions.
import * as categoryActions from './reducer/categoryActions'
import {Loader, Error} from '../components-api/ApiResponses'

const ListOfCategories = () => {
    const dispatch = useDispatch();
    const categoryReducer = useSelector(state => state.categoryReducer)

    const {
        api_actions: {cargando, error},
        data:{
            Id
        },
        list_categories
    } = categoryReducer;

    useEffect(() => {
        if(Id){
            dispatch(categoryActions.categoryCleanState())
            dispatch(categoryActions.categoryMethods('','GetCategories'))
        }
    }, [dispatch, Id])
    
    const deleteAction = async (categoryId) => {
        dispatch(categoryActions.categoryMethods({Id: categoryId},'DeleteCategory'));
        
    }

    return(
        <>
            {cargando ? <Loader activate={cargando}></Loader> : ''}
            {list_categories.map(category => {
                return <Badge color={'light'} className='d-inline-block mr-2 p-2'>
                    <span className='mr-2'>{category.Name} </span>
                    <EditCategoryModal 
                        category={category}
                    />
                    <DeleteCategoryModal 
                        category={category}
                        action={() => deleteAction(category.Id)}
                    />

                    {/* <ModalForm 
                        key={category.Id}
                        clean={this.cleanModal}
                        modalTitle={`Editar Categoria: ${category.Name}`}
                        content={<Category categoryId={category.Id}></Category>}
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

export default ListOfCategories
