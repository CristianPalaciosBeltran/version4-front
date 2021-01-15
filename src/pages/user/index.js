import React from 'react' 
import {Row} from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import {Container} from 'reactstrap'
import {Navbars} from '../../config-components'
import {Company, Position as TemplatePosition} from '../templates'
import * as ComponentsOrganizatioChart from './OrganizationChart'
import * as FaIcons from "react-icons/fa"

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
    const companyReducer = useSelector(state => state.companyReducer)
    const {companyId} = useParams();
    const { data: {TradeName}} = companyReducer
    return (
        <>
            <DashboardUserTemplate>
                <Company.Indicators companyName={TradeName} companyId={companyId} hrefBase={'user-dashboard'}/>
            </DashboardUserTemplate>
        </>
    )
}

export const UserListOfPositionPage = () =>{
    return (
        <>
            <DashboardUserTemplate>
                <TemplatePosition.ListOfPositions 
                    reDirect={`/user-dashboard/company/companyId/update-position/positionId`}
                    reDirectBase='/user-dashboard/company/companyId'
                    reDirectCreate='/user-dashboard/company/companyId/create-position'
                />
            </DashboardUserTemplate>
        </>
    )
}

export const UserCreatePosition = () =>{
    const {companyId} = useParams();
    return (
        <>
            <DashboardUserTemplate>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`/user-dashboard/company/${companyId}/positions`} className="text-muted">Posiciones</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Puestos</small></li>
            </ul>
                <Row>
                    <TemplatePosition.CreatePosition 
                        reDirect='/user-dashboard/company/companyId/positions'
                    />
                </Row>
            </DashboardUserTemplate>
        </>
    )
}

export const UserOrganizationChart = ComponentsOrganizatioChart;