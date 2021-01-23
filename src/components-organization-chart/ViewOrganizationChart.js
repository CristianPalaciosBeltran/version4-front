import React  from 'react'
import {Link} from 'react-router-dom'

import { 
    FormGroup,
    Input,
    Col,
    DropdownItem
} from 'reactstrap'

import {ApiResponses} from '../components-api'
import {connect} from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'
import * as areaActions from '../components-area/reducer/areaActions'
import * as FaIcons from "react-icons/fa"

import {Collapse, DropDowns} from '../config-components'
import './style.css'

class OrganizationChart extends React.Component {

    constructor(props) {
        super(props)
        
        this.container  = React.createRef();
        this.state = {
          value: ''
        }
      }

      async componentDidMount() {
        const {
            organizationChartMethods,
            areaMethods,
            companyId
        } = this.props;
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId');
        companyId && await areaMethods({companyId: companyId}, 'GetAreasByCompanyIdTaken')
   
       
        this.centerDiagram();
    }

    
    centerDiagram = () => {
        const element = this.container.current;
        if (element) {
            //element.scrollTop = (element.scrollHeight - element.clientWidth) / 2;
            element.scrollLeft = (element.scrollWidth - element.clientHeight) / 2;
        }
    }

    createOrganigrama =  (organigrama, isOpenAux = false) => {
        let ChartTree1 = organigrama?.ChartTree1
        if(ChartTree1?.length === 0 || ChartTree1 === undefined || !ChartTree1){
            
            return <div>
                    <Collapse.Node 
                        positionChartId={organigrama.Id}
                        positionId = {organigrama.PositionId}
                        labelButton={organigrama.PositionName}
                        employee = { organigrama.PersonName}
                        area = { organigrama.Area}
                        addChild={() => this.addChild(organigrama?.Id)}
                        deleteChild={() => this.deleteChild(organigrama?.Id)}
                        updateNode={() => this.updateNode(organigrama?.Id)}
                        watchChild={() => this.watchChild(organigrama.PositionChartId)}
                        isOpenAux={isOpenAux}
                    />
            </div>
        }
        
        return <Collapse.Node
            positionChartId={organigrama.Id}
            positionId = {organigrama.PositionId}
            labelButton={organigrama.PositionName}
            employee = { organigrama.PersonName}
            area = { organigrama.Area}
            addChild={() => this.addChild(organigrama?.Id)}
            updateNode={() => this.updateNode(organigrama?.Id)}
            watchChild={() => this.watchChild(organigrama.PositionChartId)}
            isFirst={organigrama.PositionChartId}
            isOpenAux={isOpenAux}
        >
            {
                ChartTree1.map((child) => {  
                             
                    return <>
                    	{this.createOrganigrama(child)}
                    </>
                })
            }
        </Collapse.Node>
    }

    createOrigin = async () => {
        const {organizationChartMethods, companyId} = this.props;
        await organizationChartMethods({CompanyId: companyId},'PostOrganizationChart')
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId')
    }

    addUpChild = async (parentId) => {
        debugger
        const {organizationChartMethods, companyId} = this.props;
        await organizationChartMethods({CompanyId: companyId, PositionChartId: parentId },'PostOrganizationChart')
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId')
    }

    addChild = async (parentId) => {
        debugger
        const {organizationChartMethods, companyId} = this.props;
        await organizationChartMethods({CompanyId: companyId, PositionChartId: parentId },'PostOrganizationChart')
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId')
    }

    deleteChild = async (parentId) => {
        debugger
        const {organizationChartMethods, companyId} = this.props;
        await organizationChartMethods({Id: parentId },'DeleteOrganizationChart')
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId')
    }

    updateNode = (nodeId) => {
        const {history, companyId} = this.props;
        history.push(`/admin-dashboard/company/${companyId}/organization-chart/node/${nodeId}`)
    }

    getOrganizationChartByArea = async(e) => {
        //e.preventDefault();
        const value = e//e.target.value;
        const {companyId, organizationChartMethods} = this.props;
        value === 'general' ? 
            await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId') :
            await organizationChartMethods({companyId, areaId: value},'GetOrganizationChartByArea');
    }

    watchChild = async(positionChartId) => {
        const {companyId, organizationChartMethods} = this.props;
        await organizationChartMethods({companyId,positionChartId},'GetOrganizationChartByFatherPosition');
    }

    getCompleteOrganizationChart = async() => {
        const {
            organizationChartMethods,
            companyId
        } = this.props;
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId');
    }

    render () {

        const { 
            organizationChartReducer:{
                data: {Id},
                api_actions: {
                    cargando,
                    error
                }
            },
            areaReducer: {
                list_areas
            }, 
            hrefBase
        } = this.props

        return(
            <div >
               
                <ul className="list-inline m-4">
                    <li className="list-inline-item"><small><Link to={`${hrefBase}`} className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item "><small className="font-weight-bold">Organigrama <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item ">
                        <DropDowns.DropDownActions labelButton='Areas'>
                                <DropdownItem onClick={() => this.getOrganizationChartByArea('general')}>General</DropdownItem>
                                {
                                    list_areas.map(area => {
                                        
                                        return <DropdownItem onClick={() => this.getOrganizationChartByArea(area.Id)}>{area.Name}</DropdownItem>
                                    })
                                }
                        </DropDowns.DropDownActions>
                    </li>
                    <li>
                    <DropDowns.DropDownActions labelButton='Edición'>
                        <DropdownItem >Editar</DropdownItem>
                        <DropdownItem >Vista</DropdownItem>
                    </DropDowns.DropDownActions>
                    </li>
                </ul>
                {
                    cargando 
                        ? 
                            <ApiResponses.Loader activate={true}/> 
                        :
                    error 
                        ? 
                            <ApiResponses.Error message={error} />
                        :
                    Id 
                        ? 
                             
                            <div className='m-4'> 
                                <h1>{this.props.organizationChartReducer.data.Area ? this.props.organizationChartReducer.data.Area : 'General'}</h1>
                                {
                                    this.createOrganigrama(this.props.organizationChartReducer.data, true)
                                }
                            </div>
                            	
                        : 
                            <FaIcons.FaPlusCircle className="" onClick={this.createOrigin}/>
                        
                } 
            </div>
        )
    }
}
const mapStateToProps = ({organizationChartReducer, areaReducer}) => {
    return {organizationChartReducer, areaReducer}
}

const mapDispatchToProps = {
    ...organizationChartActions,
    ...areaActions
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationChart);