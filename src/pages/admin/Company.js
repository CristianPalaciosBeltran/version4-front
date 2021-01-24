import {Company, ListOfCompanies as Companies} from '../../components-company'
import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {
    Row, Col,Card, CardBody
} from 'reactstrap'
import {AdminDashboardPages} from './'

import {Company as CompanyTemplate} from '../templates'

import {ListOfHistory} from '../../config-components'

export const ListOfCompanies = ({reDirect, history}) =>{
    return (
        <Companies reDirect={reDirect} history={history} />
    )
}

export const CreateCompany = () => {
    const {userId} = useParams();
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
                                <Company userId={userId} history={history} reDirect={'/admin-dashboard/company'} />
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
                    companyName={TradeName} 
                    companyId={companyId} 
                    hrefBase={'admin-dashboard'}
                />
            </AdminDashboardPages.TemplateDashboardAdmin>
        </>
    )
}