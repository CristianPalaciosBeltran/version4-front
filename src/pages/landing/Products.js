// Imports de react.
import React from 'react'
import {Container, Row} from 'reactstrap'
import {Navbars} from '../../config-components' 
import {ListOfCardProducts} from '../../components-product'

const LandingProducts = () => {
    return (
        <>
            <Navbars.Navbars />
            <section className="bg-light py-6">
                <Container>
                    <Row>
                    <ListOfCardProducts />
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default LandingProducts;
