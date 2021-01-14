import {OrganizationChart, UpdateChild} from '../../components-organization-chart'
import {useParams, useHistory} from 'react-router-dom'
import {DashboardUserTemplate} from './'

export const OrgainaztionChart = () => {
    const history = useHistory();
    return (
        <>
            <DashboardUserTemplate>
                <OrganizationChart companyId={3} history={history} hrefBase={'/user-dashboard'}/>
            </DashboardUserTemplate>
        </>
    )
}

export const UpdateCurrent = () => {
    const {companyId, nodeId} = useParams();
    const history = useHistory();

    return (
        <>
            <DashboardUserTemplate>
                <UpdateChild history={history} companyId={companyId} nodeId={nodeId} reDirect={`/admin-dashboard/company/${companyId}/organization-chart`}/>
            </DashboardUserTemplate>
        </>
    )
}
