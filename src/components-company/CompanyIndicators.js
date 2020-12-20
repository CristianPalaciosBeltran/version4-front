// Imports de react.
import React, {Component} from 'react'
import { Col } from 'reactstrap'
import {Link} from 'react-router-dom'

// Imports de config-components
import {CardAnalytics} from '../config-components/Cards'

// Imports de actions.
import {connect } from 'react-redux'
import * as analyticsActions from '../components-analytics/reducer/analyticsActions'
import * as companyActions from './reducer/companyActions'

import {Loader} from '../components-api/ApiResponses'
// FontAwesome Icons.
import * as FaIcons from "react-icons/fa"

class Indicators extends Component {
    componentDidMount = async () => {
        const {analyticsMethods, companyMethods, companyId} = this.props;
        await analyticsMethods('count_products')
        await analyticsMethods('count_courses', {Id:6})
        await analyticsMethods('count_users')
        await analyticsMethods('count_admins')
        await companyMethods({Id:companyId},'GetCompany')
    }
    render(){
        const {
            count_products,
            count_courses,
            count_users,
            count_admins,
            api_actions:{
                cargando,
            }
        } = this.props.analyticsReducer;
        const cardAnalytics = [
            
            {
                id: '1-p',
                title: 'Puestos',
                number:  cargando ? <Loader activate={cargando}></Loader> : count_users,
                icon: <FaIcons.FaUserAlt className="mr-2" />,
                href: '/admin-dashboard/company/positions'
            },
            {
                id: '2-p',
                title: 'Empleados',
                number: cargando ? <Loader activate={cargando}></Loader> : count_products,
                icon: <FaIcons.FaDiceD6 className="mr-2" />,
                href: '/admin-dashboard/company/employees'
            }, 
            {
                id: '3-p',
                title: 'Organigrama',
                number: 'Ver',
                icon: <FaIcons.FaDiceD6 className="mr-2" />,
                href: '/admin-dashboard/company/organization-chart'
            },      
        ] 
        return(
            <>
                {cardAnalytics.map(data => {
                    return (
                        <Col lg="4" key={data.id}>
                                <Link to={data.href}>
                                <CardAnalytics 
                                    icon={data.icon}
                                    title={data.title}
                                    number={data.number}
                                />
                            </Link>
                        </Col> 
                    )
                })} 
            </>    
        )
    }     
   
}

const mapStateToProps = ({analyticsReducer, companyReducer}) => {
    return {analyticsReducer, companyReducer}
}

const mapDispatchToProps = {
    ...analyticsActions,
    ...companyActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Indicators);

