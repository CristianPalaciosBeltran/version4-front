import React from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Row } from 'reactstrap'
import {AdminDashboardPages} from './'
import {Position as TemplatePosition} from '../templates'
import * as FaIcons from "react-icons/fa"

export const ListOfPositions = () =>{
    return (
        <AdminDashboardPages.TemplateDashboardAdmin>
            <TemplatePosition.ListOfPositions 
                reDirect={`/admin-dashboard/company/companyId/update-position/positionId`}
                reDirectBase='/admin-dashboard/company/companyId'
                reDirectCreate='/admin-dashboard/company/companyId/create-position'
            />
        </AdminDashboardPages.TemplateDashboardAdmin>
    )
}

export const CreatePosition = () => {
    const {companyId} = useParams();
    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
            <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}/positions`} className="text-muted">Posiciones</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Puestos</small></li>
            </ul>
                <Row>
                    <TemplatePosition.CreatePosition 
                        reDirect={`/admin-dashboard/company/companyId/positions`}
                    />
                </Row>
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}
