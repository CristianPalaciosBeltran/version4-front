import React from 'react'

import {TemplateDashboardAdmin} from './Dashboard'
import { PersonDetail as TemplatesPersonalDetail} from '../templates'


export const ListOfPersonDetails = () =>{
    
    return (
        <TemplateDashboardAdmin>
            <TemplatesPersonalDetail.ListOfPersonDetails redirectUser='/admin-dashboard' />
        </TemplateDashboardAdmin>
    )
}

export const CreatePersonDetail = () => {

    return (
        <>
            <TemplateDashboardAdmin>
                <TemplatesPersonalDetail.CreatePersonDetail redirectUser='/admin-dashboard'/>  
            </TemplateDashboardAdmin>
        </>
    )
}

export const UpdatePersonDetail = () => {

    return (
        <>
            <TemplateDashboardAdmin>
                <TemplatesPersonalDetail.CreatePersonDetail redirectUser='/admin-dashboard'/>  
            </TemplateDashboardAdmin>
        </>
    )
}



