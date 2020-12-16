// Imports de react
import React from 'react'
import {useHistory, useParams, Link} from 'react-router-dom'
import {Row, Col, Card, CardBody} from 'reactstrap'

// Imports de componentes.
import {CardProduct, ListOfProducts as Products, AddCategories} from '../../components-product'
import Product from '../../components-product/Product'
import CategoryProduct from '../../components-category-product/CategoryProduct'
import ListOfCategoriesOfProducts from '../../components-category-product/ListOfCategoriesOfProducts'
import {Category, ListOfCategories} from '../../components-category'
import {ProductDetail} from '../../components-product-details'

// Icons
import * as FaIcons from "react-icons/fa"


// Imports de pages.
import {TemplateDashboardAdmin} from './Dashboard'

export const ListOfProducts = () => {
    return(
        <Products reDirect={'/admin-dashboard/product'}/>
    )
}

export const CreateProduct = () => {
    const history = useHistory();  
    return (
        <>
        <ul className="list-inline mb-4">
            <li className="list-inline-item"><small><Link to="/admin-dashboard" className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
            <li className="list-inline-item"><small><Link to="/admin-dashboard/products" className="text-muted">Productos</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
            <li className="list-inline-item "><small className="font-weight-bold">Crear producto</small></li>
        </ul>
        <Row>
            <Col lg="6">
                <Card className="border-0">
                    <CardBody className="card-body">
                        <h5 className="font-weight-bold mb-3">Crea un producto nuevo</h5>
                        <Product reDirect={`/admin-dashboard/product`} history={history}/>
                        
                    </CardBody>
                </Card>
            </Col>
            <Col lg="6">
                <CardProduct />
                
                {/* <Card className="border-0">
                    <CardBody>
                        <Category />
                        <ListOfCategories/>
                    </CardBody>
                </Card> */}
            </Col>
        </Row>
        </>
    )
}

export const EditProduct = () => {
    let {productId,section} = useParams();
    const history = useHistory();

    const ProductSection = (section) => {
        switch(section){
            case 'cover':
                return <>
                <h5 className="font-weight-bold mb-3">Edita este producto </h5>
                <Product productId={productId} history={history}/>
                </>
            case 'detail':
                return <div>
                    <h5 className="font-weight-bold mb-3">Sube detalle del producto </h5>
                    <ProductDetail productId={productId} />
                </div>
                
            default:
                return <Product productId={productId} history={history}/>
        }
    }

    return (
        <TemplateDashboardAdmin>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to="/admin-dashboard" className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item"><small><Link to="/admin-dashboard/products" className="text-muted">Productos</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Editar producto</small></li>
            </ul>
             <Row>
                <Col lg="6">
                    <Card className="border-0">
                        <CardBody className="card-body">
                            <Link to={`/admin-dashboard/product/${productId}/cover`}>producto </Link>/ 
                            <Link  to={`/admin-dashboard/product/${productId}/detail`}> detalle</Link>
                            
                            {
                                ProductSection(section)
                            }
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <CardProduct />
                    {/* <Card className="border-0">
                        <CardBody>
                            <AddCategories />
                        </CardBody>
                    </Card> */}
                    {/* <Card className="border-0">
                        <CardBody>
                            <Category />
                            <ListOfCategories/>
                        </CardBody>
                    </Card> */}
                </Col>
            </Row>
        </TemplateDashboardAdmin>
    )
}

export const CategoryProducts = () =>{
    return (
        <>
            <CategoryProduct />
            <ListOfCategoriesOfProducts></ListOfCategoriesOfProducts>
        </>
    )
}

