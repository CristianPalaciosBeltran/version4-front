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
        await analyticsMethods('count_positions', {companyId})
        await analyticsMethods('count_personal_details', {companyId})
        await analyticsMethods('count_areas', {companyId})
        await companyMethods({Id:companyId},'GetCompany')
    }
    render(){
        const {
            count_positions,
            count_personal_details,
            count_areas,
            api_actions:{
                cargando,
            },
            
        } = this.props.analyticsReducer;
        
        const cardAnalytics = [
            {
                id: '3-p',
                title: 'Organigrama',
                number: 'Ver',
                icon: <FaIcons.FaSitemap className="mr-2" />,
                href: `${this.props.hrefBase}/company/${this.props.companyId}/organization-chart`
            },            
            {
                id: '1-p',
                title: 'Posiciones',
                number:  cargando ? <Loader activate={cargando}></Loader> : count_positions,
                icon: <FaIcons.FaChair className="mr-2" />,
                href: `${this.props.hrefBase}/company/${this.props.companyId}/positions`
            },
            {
                id: '2-p',
                title: 'Colaboradores',
                number: cargando ? <Loader activate={cargando}></Loader> : count_personal_details,
                icon: <FaIcons.FaUserFriends className="mr-2" />,
                href: `${this.props.hrefBase}/company/${this.props.companyId}/employees`
            }, 
            {
                id: '4-p',
                title: 'Areas',
                number: cargando ? <Loader activate={cargando}></Loader> : count_areas,
                icon: <FaIcons.FaBuromobelexperte className="mr-2" />,
                href: `${this.props.hrefBase}/company/${this.props.companyId}/areas`
            },      
            {
                id: '5-p',
                title: 'Indicadores',
                number: 'Ver',
                icon: <FaIcons.FaChartPie className="mr-2" />,
                href: `${this.props.hrefBase}/company/${this.props.companyId}/areas`
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

