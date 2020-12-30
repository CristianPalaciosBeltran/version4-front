import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card,  CardBody, CardTitle, CardSubtitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import {ReadPosition} from '../components-position'
import {ApiResponses} from '../components-api'
import {connect} from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'
import * as areaActions from '../components-area/reducer/areaActions'

import * as FaIcons from "react-icons/fa"


const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
`;

export const Modals = ({positionId, children, modalTitle, name}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
      <>
        <span role="button" onClick={toggle}>{children}</span>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <h3>{name}</h3>
            <ReadPosition positionId={positionId} />
          </ModalBody>
          {/* <ModalFooter>
            <Button color="danger" onClick={toggle}>Quitar puesto</Button>{' '}
            <Button color="primary" onClick={toggle}>Cerrar</Button>
          </ModalFooter> */}
        </Modal>
      </>
    );
  }


export const CardNode = ({positionId,name, employee, area, addChild, updateNode,deleteChild}) => {
    return(
        
        <Card>
            <CardBody className=' d-flex justify-content-between'>
                <div className={'mr-5 '}>
                    <div className='font-weight-bold  mb-2' style={{textAlign: 'start'}}>
                        {name}
                    </div>
                    <div className='text-dark text-start' style={{textAlign: 'start'}}>
                        {employee ? `${employee.Name} ${employee.LastName} ` :'Empleado'}
                    </div> 
                    {area && <div className='text-dark text-start' style={{textAlign: 'start'}}>
                       {`${area.Type}: ${area.Name}`}
                    </div> }
                </div>
                <div>
                    {/* <div>
                        <FaIcons.FaPlusCircle className="text-secondary" onClick={addChild}/>
                    </div> */}
                    <div>
                        <Modals positionId={positionId} modalTitle={name} name={name} >
                            <FaIcons.FaEye  className="text-secondary" />
                        </Modals>
                    </div>
                    <div>
                        <FaIcons.FaUserEdit className="text-secondary" onClick={updateNode}/>
                    </div>
                    <div>
                        <FaIcons.FaPlusCircle className="text-secondary" onClick={addChild}/>
                    </div>
                    <div>
                        {deleteChild && <FaIcons.FaMinusCircle className='text-secondary' onClick={deleteChild}/>}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
  }

 
class OrganizationChart extends React.Component {

    state = {
        tree: ''
    }
    async componentDidMount() {
        const {
            organizationChartMethods,
            areaMethods,
            companyId
        } = this.props;
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId');
        companyId && await areaMethods({companyId: companyId}, 'GetAreasByCompanyIdTaken')
      
    }

    createOrganigrama =  (organigrama) => {
        let OrganizationChart1 = organigrama?.OrganizationChart1
        if(OrganizationChart1?.length === 0 || OrganizationChart1 === undefined || !OrganizationChart1){
            
            return <TreeNode 
                label={
                <StyledNode>
                    <CardNode 
                        positionId = {organigrama?.Position?.Id}
                        name={organigrama?.Position?.Name ? organigrama?.Position?.Name : 'Sin puesto'} 
                        employee = { organigrama.PersonalDetail}
                        area = { organigrama.Area}
                        addChild={() => this.addChild(organigrama?.Id)}
                        deleteChild={() => this.deleteChild(organigrama?.Id)}
                        updateNode={() => this.updateNode(organigrama?.Id)}
                    />
                </StyledNode>
                }
            />
        }
        
        return <TreeNode 
            label={
                <StyledNode>
                    <CardNode 
                        positionId = {organigrama?.Position?.Id}
                        name = {organigrama?.Position?.Name ? organigrama?.Position?.Name : 'Sin puesto'} 
                        employee = { organigrama.PersonalDetail}
                        area = { organigrama.Area}
                        addChild={() => this.addChild(organigrama?.Id)}
                        updateNode={() => this.updateNode(organigrama?.Id)}
                    />
                </StyledNode>
            }
        >
            {
                OrganizationChart1.map((child) => {           
                    return this.createOrganigrama(child)
                })
            }
        </TreeNode>
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

    getOrganizationChartByArea = async(areaId) => {
        const {companyId, organizationChartMethods} = this.props;
        await organizationChartMethods({companyId, areaId},'GetOrganizationChartByArea');
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
            companyId 
        } = this.props

        return(
            <div>
                <ul className="list-inline mb-4">
                    <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}`} className="text-muted">mis indicadores</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item "><small className="font-weight-bold">Organigrama</small></li>
                </ul>
                {
                    list_areas
                        && 
                        <div>
                            <div>
                                filtrar por areas o departamentos
                            </div>
                            <ul>
                                <li className="pointer" onClick={() => this.getCompleteOrganizationChart()}>General</li>
                                {
                                    list_areas.map(area => {
                                        return <li className="pointer" key={`area-${area.Id}`} onClick={() => this.getOrganizationChartByArea(area.Id)}>
                                            {area.Name}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>

                }
               
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
                            <Tree
                                lineWidth={'2px'}
                                lineColor={'gray'}
                                lineBorderRadius={'10px'}
                                label={
                                    <StyledNode>
                                        <h1>Compañia</h1>
                                    </StyledNode>
                                }
                            >
                                {
                                    // this.state.tree
                                    this.createOrganigrama(this.props.organizationChartReducer.data)
                                }
                            </Tree>
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