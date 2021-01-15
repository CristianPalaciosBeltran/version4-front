import React from 'react'

import {TemplateDashboardAdmin} from './Dashboard'
import { PersonDetail as TemplatesPersonalDetail} from '../templates'


export const ListOfPersonDetails = ({reDirect, history}) =>{
    
    return (
        <TemplateDashboardAdmin>
            <TemplatesPersonalDetail.ListOfPersonDetails reDirect={reDirect} history={history} />
        </TemplateDashboardAdmin>
    )
}

export const CreatePersonDetail = () => {

    return (
        <>
            <TemplateDashboardAdmin>
                <TemplatesPersonalDetail.CreatePersonDetail />  
            </TemplateDashboardAdmin>
        </>
    )
}



