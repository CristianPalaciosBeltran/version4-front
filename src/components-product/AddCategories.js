// Imports de react.
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Badge} from 'reactstrap'

// Imports de actions.
import * as categoryActions from '../components-category/reducer/categoryActions'
import {Loader, Error} from '../components-api/ApiResponses'

import * as FaIcons from "react-icons/fa"

const AddCategories = () => {
    const dispatch = useDispatch();
    const categoryReducer = useSelector(state => state.categoryReducer)
    const productReducer = useSelector(state => state.productReducer)

    const {
        api_actions: {cargando, error},
        list_categories
    } = categoryReducer;

    useEffect(() => {
            dispatch(categoryActions.categoryMethods('','GetCategories'))
    }, [dispatch])
    
    const addCategory = (category) => {
        productReducer.data.Categories.push(category)
    }

    return(
        <>
            {cargando ? <Loader activate={cargando}></Loader> : ''}
            {list_categories.map(category => {
                return <Badge color={'light'} className='d-inline-block mr-2 p-2'>
                    <span className='mr-2'>{category.Name} </span>
                    <FaIcons.FaPlusCircle onClick={() => addCategory(category)}/>
                    </Badge>
                
            })}
            {error ? <Error message={error}></Error> : ''}
        </>
    )
    
}

export default AddCategories
