import React from 'react' 
import {Container} from 'reactstrap'
import {Navbars} from '../../config-components'
import {Company} from '../templates'
import * as ComponentsOrganizatioChart from './OrganizationChart'

export const DashboardUserTemplate = ({children}) => {
    return(
            <>
                <Navbars.User />
                <section className="bg-light h-100 py-6">
                    <Container>
                        {children}
                    </Container>
                </section>
            </>
    )
}

export const DashboardUserPage = () => {
    return (
        <>
            <DashboardUserTemplate>
                <Company.Indicators companyName={'Teresita'} companyId={3} hrefBase={'user-dashboard'}/>
            </DashboardUserTemplate>
        </>
    )
}

export const UserOrganizationChart = ComponentsOrganizatioChart;