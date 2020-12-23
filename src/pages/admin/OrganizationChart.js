import {OrganizationChart, UpdateChild} from '../../components-organization-chart'
import {useParams, useHistory} from 'react-router-dom'
import {AdminDashboardPages} from './'

export const OrgainaztionChart = () => {
    const {companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
                <OrganizationChart companyId={companyId} history={history}/>
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}

export const UpdateCurrent = () => {
    const {companyId, nodeId} = useParams();
    const history = useHistory();

    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
                <UpdateChild history={history} companyId={companyId} nodeId={nodeId} reDirect={`/admin-dashboard/company/${companyId}/organization-chart`}/>
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}
