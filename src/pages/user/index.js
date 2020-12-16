import React from 'react' 
import {Container} from 'reactstrap'
import {Navbars} from '../../config-components'

export const DashboardUserPage = () => {
    return (
        <>
            <Navbars.User />
            <section className="bg-light h-100 py-6">
                <Container>
                    Se implemento DashboardUser
                </Container>
            </section>  
        </>
    )
}