// Imports de react.
import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de components.
import ReadCardProduct from './ReadCardProduct'
import * as productActions from './reducer/productActions'



const CardProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const productReducer = useSelector(state => state.productReducer);

    const { data:{
        Id,
        Name,
        Description,
        Blobs,
        fileCover,
        Categories
    } } = productReducer;

    useEffect(() => {
        productId && dispatch(productActions.productMethods({Id: productId}, 'GetProduct'))
    }, [dispatch, productId, Id])

    const blobProduct = Blobs.filter(el => el.BlobTypeId === 2 )
    return (
        <>
            <ReadCardProduct uri={fileCover ? URL.createObjectURL(fileCover[0]) : blobProduct[0]?.Uri} name={Name} description={Description} categories={Categories}/>
        </>
    )
}

export default CardProduct;
