import React from 'react'
import {TemplateDashboardAdmin} from './Dashboard'
import {Area as TemplateArea} from '../templates'

export const ListOfAreas = () =>{
    return (
        <TemplateDashboardAdmin>
            <TemplateArea.ListOfAreas redirectUser={'/admin-dashboard'} />
        </TemplateDashboardAdmin>
    )
}

export const CreateArea = () => {
    return (
        <>
            <TemplateDashboardAdmin>
                <TemplateArea.CreateArea  redirectUser='/admin-dashboard' ></TemplateArea.CreateArea>
            </TemplateDashboardAdmin>
        </>
    )
}

export const UpdateArea = () => {
    return (
        <>
            <TemplateDashboardAdmin>
                <TemplateArea.CreateArea  redirectUser='/admin-dashboard' ></TemplateArea.CreateArea>
            </TemplateDashboardAdmin>
        </>
    )
}
