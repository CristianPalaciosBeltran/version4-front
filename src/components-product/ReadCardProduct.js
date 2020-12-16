// Imports de react.
import React from 'react'
import {  Card, CardBody, Badge  } from 'reactstrap';
// Imports de assets.
import {ImgProduct} from '../img'
import * as FaIcons from "react-icons/fa"

const ReadCardProduct = ({uri, name='', description='', categories}) => {
    return(
        <Card className="border-0 mb-4">
            <CardBody>
                <ImgProduct uri={uri} className="img-fluid rounded mb-3"/>
                <div className="mb-3">
                    {categories?.length > 0 ? 
                        categories.map(category => {
                            return <Badge color="light" className="mr-2">{category.Name}</Badge>
                        })  : ''  
                    }
                </div>
                <div className="d-flex">
                    <div className="icon-card d-flex bg-light align-self-center mr-3">
                        <FaIcons.FaShoppingCart className="align-self-center mx-auto" />
                    </div>
                    <div>
                        <h5>{name}</h5>
                        <h6>{description}</h6>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default ReadCardProduct;
