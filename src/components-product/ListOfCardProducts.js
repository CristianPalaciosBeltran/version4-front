// Imports de react.
import React, {useEffect} from 'react'
import {Col} from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
// Imports de components.
import ReadCardProduct from './ReadCardProduct'
import * as productActions from './reducer/productActions'

const ListOfCardProducts = () => {
    const dispatch = useDispatch();
    const productReducer = useSelector(state => state.productReducer);
    const { list_products } = productReducer;
    useEffect(() => {
        list_products.length < 1 && dispatch(productActions.productMethods('', 'GetProducts'))
    }, [dispatch, list_products ])
    return (
        <>
            {
                list_products.map(product => {
                    const blobProduct = product.Blobs.filter(el => el.BlobTypeId === 1 )
                    return (
                        <Col lg='4'>
                            <ReadCardProduct uri={blobProduct[0]?.Uri} name={product.Name} description={product.Description} />
                        </Col>
                    )
                })
            }
           
        </>
    )
}

export default ListOfCardProducts;
