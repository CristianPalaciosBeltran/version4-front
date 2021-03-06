import { UpdateChild, ViewOrganizationChart} from '../../components-organization-chart'
import {useParams, useHistory} from 'react-router-dom'
import {AdminDashboardPages} from './'
import {NavbarAdmin} from '../../config-components/Navbars'


export const OrgainaztionChart = () => {
    const {companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <NavbarAdmin />
            <ViewOrganizationChart companyId={companyId} history={history} hrefBase={`/admin-dashboard/company/${companyId}`}/>
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
