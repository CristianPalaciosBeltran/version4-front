// Imports de react.
import React, {Component} from 'react'
import { Col } from 'reactstrap'
import {Link} from 'react-router-dom'

// Imports de config-components
import {CardAnalytics} from '../config-components/Cards'

// Imports de actions.
import {connect } from 'react-redux'
import * as analyticsActions from '../components-analytics/reducer/analyticsActions'
import {Loader} from '../components-api/ApiResponses'
// FontAwesome Icons.
import * as FaIcons from "react-icons/fa"

class Indicators extends Component {
    componentDidMount = async () => {
        const {analyticsMethods} = this.props;
        await analyticsMethods('count_products')
        await analyticsMethods('count_courses', {Id:6})
        await analyticsMethods('count_users')
        await analyticsMethods('count_admins')

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
                id: '4-a',
                title: 'Admins',
                number:  cargando ? <Loader activate={cargando}></Loader> : count_admins,
                icon: <FaIcons.FaUserAlt className="mr-2" />,
                href: '/admin-dashboard/admins'
            },
            {
                id: '2-a',
                title: 'Usuarios',
                number:  cargando ? <Loader activate={cargando}></Loader> : count_users,
                icon: <FaIcons.FaUserAlt className="mr-2" />,
                href: '/admin-dashboard/users'
            },
            {
                id: '1-a',
                title: 'Empresas',
                number: cargando ? <Loader activate={cargando}></Loader> : count_products,
                icon: <FaIcons.FaDiceD6 className="mr-2" />,
                href: '/admin-dashboard'
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

const mapStateToProps = ({analyticsReducer}) => {
    return {analyticsReducer}
}

const mapDispatchToProps = {
    ...analyticsActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Indicators);

