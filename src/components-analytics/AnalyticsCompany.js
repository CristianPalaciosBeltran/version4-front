// Imports de react.
import React, {useEffect}  from 'react'
import { Col } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import {CardAnalytics} from '../config-components/Cards'

// Imports de actions.
import * as analyticsActions from './reducer/analyticsActions'


import {Loader} from '../components-api/ApiResponses'
// FontAwesome Icons.
import * as FaIcons from "react-icons/fa"

const AnalyticsCompany = () => {
    
    const { companyId } = useParams();
    const dispatch = useDispatch();
    const analyticsReducer = useSelector(state => state.analyticsReducer);
    useEffect(() => {
        dispatch(analyticsActions.analyticsMethods('ANALYTICS_COMPANY', {companyId}));
    }, [dispatch, companyId])
    
    const {
        analytics_company,
        api_actions:{
            cargando,
        },
    } = analyticsReducer;
        
    const cardAnalytics = [
        {
            id: '1-a',
            title: 'Colaboradores Hombres',
            number: cargando ? <Loader activate={cargando}  /> : analytics_company.CountMens,
            icon: <FaIcons.FaUserFriends className="mr-2" />,
        },            
        {
            id: '2-a',
            title: 'Colaboradores Mujeres',
            number: cargando ? <Loader activate={cargando} /> :analytics_company.CountWomen,
            icon: <FaIcons.FaUserFriends className="mr-2" />,
        },
        {
            id: '3-a',
            title: 'Salario Mensual',
            number: cargando ? <Loader activate={cargando} /> :analytics_company.MonthlySalary?.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
            icon: <FaIcons.FaMoneyBill className="mr-2" />,
        }, 
        {
            id: '4-a',
            title: 'Salario Total',
            number: cargando ? <Loader activate={cargando} /> :analytics_company.TotalSalary?.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
            icon: <FaIcons.FaMoneyBill className="mr-2" />,
        },      
    ] 
    return(
        <>
            {cardAnalytics.map(data => {
                return (
                    <Col lg="4" key={data.id}>
                        <CardAnalytics 
                            icon={data.icon}
                            title={data.title}
                            number={data.number}
                        />
                    </Col> 
                )
            })} 
        </>    
    )
}


export default AnalyticsCompany;

