import {ViewOrganizationChart, UpdateChild} from '../../components-organization-chart'
import {useParams, useHistory} from 'react-router-dom'
import {DashboardUserTemplate} from './'

export const OrgainaztionChart = () => {
    const {companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <DashboardUserTemplate>
                <ViewOrganizationChart companyId={companyId} history={history} hrefBase={`/user-dashboard/company/${companyId}`}/>
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
                <UpdateChild history={history} companyId={companyId} nodeId={nodeId} reDirect={`/user-dashboard/company/${companyId}/organization-chart`}/>
            </DashboardUserTemplate>
        </>
    )
}
