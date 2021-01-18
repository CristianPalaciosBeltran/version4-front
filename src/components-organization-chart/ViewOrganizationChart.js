import React  from 'react'
import {Link} from 'react-router-dom'

import { 
    FormGroup,
    Input,
    Col
} from 'reactstrap'

import {ApiResponses} from '../components-api'
import {connect} from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'
import * as areaActions from '../components-area/reducer/areaActions'
import * as FaIcons from "react-icons/fa"

import {Collapse} from '../config-components'
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

    createOrganigrama =  (organigrama) => {
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
        debugger
        e.preventDefault();
        const value = e.target.value;
        const {companyId, organizationChartMethods} = this.props;
        value === 'general' ? 
            await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId') :
            await organizationChartMethods({companyId, areaId: value},'GetOrganizationChartByArea');

        this.centerDiagram();
       
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
                    
                        <Col>
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.getOrganizationChartByArea(e)}>
                                <option value='general' >General</option>
                                {
                                    list_areas.map(area => {
                                      
                                        return <option value={area.Id}>
                                            {area.Name}
                                        </option>
                                    })
                                }
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        
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
                             
                            <div className='container'> 
                                <h1>{this.props.organizationChartReducer.data.Area?.Name ? this.props.organizationChartReducer.data.Area?.Name : 'General'}</h1>
                                {
                                    this.createOrganigrama(this.props.organizationChartReducer.data)
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