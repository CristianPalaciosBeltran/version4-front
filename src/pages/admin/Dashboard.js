// Imports de react.
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row } from 'reactstrap'

// Imports de config-components.
import {NavbarAdmin} from '../../config-components/Navbars'

// Imports de components
import Indicators from '../../components-admin/Indicators'

import {
    AdminUsersPages, AdminCoursesPages, AdminProductPages
} from './index'

export const Dashboard = () => {
    
    let {indicator} = useParams();
    let history = useHistory();
    const AdminSections = (page) =>{
        switch(page){

            case 'create-admin':
                return <AdminUsersPages.CreateAdmin />
            case 'admins':
                return <AdminUsersPages.ListOfAdmins reDirect={'admin'} history={history} />

            case 'create-user':
                return <AdminUsersPages.CreateUser />
            case 'users':
                return <AdminUsersPages.ListOfUsers reDirect={'section'} history={history} />
                
            case 'create-course':
                return <AdminCoursesPages.CreateCourse />
            case 'courses':
                return <AdminCoursesPages.ListOfCourses reDirect={'section'} history={history} />
            
            case 'create-product':
                return <AdminProductPages.CreateProduct />
            case 'products':
                return <AdminProductPages.ListOfProducts />
            
            default:
                return <>
                    <Row className="mb-4">
                        <Indicators />
                    </Row>
                </>
        }
    }
    return (
        <>
            <NavbarAdmin />
            <section className="bg-light h-100 py-6">
                <Container>
                        {
                           AdminSections(indicator)
                        }
                </Container>
            </section>
        </>
    )
}

export const TemplateDashboardAdmin = ({children}) => {
    return (
        <>
            <NavbarAdmin />
            <section className="bg-light h-100 py-6">
                <Container>
                        {
                           children
                        }
                </Container>
            </section>
        </>
    )
}