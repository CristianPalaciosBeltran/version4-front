import React, { useState } from 'react'
import {Company, ListOfCompanies as Companies} from '../../components-company'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {AdminDashboardPages} from './'

import {Company as CompanyTemplate} from '../templates'

import {ListOfHistory} from '../../config-components'
import AnalyticsCompany from '../../components-analytics/AnalyticsCompany'
import { ChooseArea } from "../../components-area";
import {AnalyticsChart} from "../../components-organization-chart"; 
import * as organizationChartActions from '../../components-organization-chart/reducer/organizationChartActions'

export const ListOfCompanies = ({reDirect, history}) =>{
    return (
        <Companies reDirect={reDirect} history={history} />
    )
}

export const CreateCompany = () => {
    const {userId, companyId} = useParams();
    const history = useHistory();
    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
                <ListOfHistory.Li
                    items={[
                        {href: '/admin-dashboard', name: 'Inicio'},
                        {href: '/admin-dashboard/companies', name: 'Empresas'},
                        {href: '', name: 'Empresas', last: true},
                    ]}
                />
                <Row>
                    <Col lg="6">
                        <Card className="border-0">
                            <CardBody className="card-body">
                                <h5 className="font-weight-bold mb-3">Crea una Empresa</h5>
                                <Company companyId={companyId} userId={userId} history={history} reDirect={'/admin-dashboard/company'} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}

export const Indicators = () => {
    const companyReducer = useSelector(state => state.companyReducer)
    const {companyId} = useParams();
    const { data: {TradeName}} = companyReducer
    return (
        <>
            <AdminDashboardPages.TemplateDashboardAdmin>
                <CompanyTemplate.Indicators 
                    user={'/admin-dashboard/company'} 
                    companyId={companyId} 
                    hrefBase={'/admin-dashboard'}
                />
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}

export const AnalyticsCompanyPage = () => {
    let [areaId, setAreaId] = useState('');
    const dispatch = useDispatch();
    const { companyId } = useParams();

    const getChartByArea = async (area) => {
        !area.Id
          ? dispatch(organizationChartActions.organizationChartMethods(
              { companyId },
              "GetOrganizationChartByCompanyId"
            ))
          : dispatch(organizationChartActions.organizationChartMethods(
              { companyId, areaId: area.Id },
              "GetOrganizationChartByArea"
            ));
        setAreaId(area.Id)
    };
   
    return(
        <AdminDashboardPages.TemplateDashboardAdmin>
            <ChooseArea getChartByArea={getChartByArea} />
            <Row>
                <AnalyticsChart areaId={areaId}/>
            </Row>
        </AdminDashboardPages.TemplateDashboardAdmin>
    )
}