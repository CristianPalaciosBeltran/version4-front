// Imports de react.
import React from 'react'
import { Container } from 'reactstrap'

// Imports de config-components
import {NotFound} from '../config-components/NotFound'
import {Navbars} from '../config-components/Navbars'


export const NotFoundPage = () => {
    return (
        <>
            <Navbars />
            <div className="bg-light py-6">
                <Container>
                    <NotFound />
                </Container>
            </div>
        </>
    )
}