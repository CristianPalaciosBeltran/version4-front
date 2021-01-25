import React from 'react' 
import {Row} from 'reactstrap'
import {useSelector} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import {Container} from 'reactstrap'
import {Navbars} from '../../config-components'
import {
    Company, 
    Position as TemplatePosition, 
    PersonDetail as TemplatesPersonalDetail,
    Area as TemplateArea
} from '../templates'
import * as ComponentsOrganizatioChart from './OrganizationChart'
import * as FaIcons from "react-icons/fa"
import { } from '../templates'


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
    const {companyId} = useParams();
    return (
        <>
            <DashboardUserTemplate>
                <Company.Indicators user={`/user-dashboard/company`} companyId={companyId} hrefBase={'user-dashboard'}/>
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
                <li className="list-inline-item "><small className="font-weight-bold">Posiciones</small></li>
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

export const UserListOfPersonDetails = () =>{
    return (
        <DashboardUserTemplate>
            <TemplatesPersonalDetail.ListOfPersonDetails redirectUser='/user-dashboard' />
        </DashboardUserTemplate>
    )
}

export const UserCreatePersonDetail = () => {
    return (
        <>
            <DashboardUserTemplate>
                <TemplatesPersonalDetail.CreatePersonDetail redirectUser='/user-dashboard'/>  
            </DashboardUserTemplate>
        </>
    )
}

export const UserUpdatePersonDetail = () => {
    return (
        <>
            <DashboardUserTemplate>
                <TemplatesPersonalDetail.CreatePersonDetail redirectUser='/user-dashboard'/>  
            </DashboardUserTemplate>
        </>
    )
}

export const UserListOfAreas = () =>{
    return (
        <DashboardUserTemplate>
            <TemplateArea.ListOfAreas redirectUser={'/user-dashboard'} />
        </DashboardUserTemplate>
    )
}

export const UserCreateArea = () => {
    return (
        <>
            <DashboardUserTemplate>
                <TemplateArea.CreateArea  redirectUser='/user-dashboard' ></TemplateArea.CreateArea>
            </DashboardUserTemplate>
        </>
    )
}

export const UserUpdateArea = () => {
    return (
        <>
            <DashboardUserTemplate>
                <TemplateArea.CreateArea  redirectUser='/user-dashboard' ></TemplateArea.CreateArea>
            </DashboardUserTemplate>
        </>
    )
}

export const UserOrganizationChart = ComponentsOrganizatioChart;