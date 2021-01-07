import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card,  CardBody, CardTitle, CardSubtitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Col
} from 'reactstrap'
import {ReadPosition} from '../components-position'
import {ApiResponses} from '../components-api'
import {Inputs} from '../config-components'
import {connect} from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'
import * as areaActions from '../components-area/reducer/areaActions'

import * as FaIcons from "react-icons/fa"
import ScrollContainer from 'react-indiana-drag-scroll'

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
    const rArea = area ? area : '';
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
                    {rArea?.Name ? <div className='text-dark text-start' style={{textAlign: 'start'}}>
                       {`Area: ${rArea.Name}`}
                    </div> : ''}
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

    constructor(props) {
        super(props)
        
        this.container  = React.createRef();
        this.state = {
          value: ''
        }
      }

      state = {
          area: 1
      }

      async componentDidMount() {
        const {
            organizationChartMethods,
            areaMethods,
            companyId
        } = this.props;
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId');
        companyId && await areaMethods({companyId: companyId}, 'GetAreasByCompanyIdTaken')
   
        const element = this.container.current;
        if (element) {
            element.scrollTop = (element.scrollHeight - element.clientWidth) / 2;
            element.scrollLeft = (element.scrollWidth - element.clientHeight) / 2;
        }
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

    getOrganizationChartByArea = async(e) => {
        debugger
        e.preventDefault();
        const value = e.target.value;
        const {companyId, organizationChartMethods} = this.props;
        value === 'general' ? 
            await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId') :
            await organizationChartMethods({companyId, areaId: value},'GetOrganizationChartByArea');

        this.setState({...this.state, area: value})
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
                <ul className="list-inline m-4">
                    <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}`} className="text-muted">Inicio</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                    <li className="list-inline-item "><small className="font-weight-bold">Organigrama</small></li>
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
                            <ScrollContainer innerRef={this.container} className="scroll-container">
                                <Tree  
                                    lineWidth={'2px'}
                                    lineColor={'gray'}
                                    lineBorderRadius={'10px'}
                                    label={
                                        <StyledNode>
                                           <h1>{this.props.organizationChartReducer.data.Area?.Name ? this.props.organizationChartReducer.data.Area?.Name : 'General'}</h1>
                                        </StyledNode>
                                    }
                                >
                                    {
                                        // this.state.tree
                                        this.createOrganigrama(this.props.organizationChartReducer.data)
                                    }
                                </Tree>
                            </ScrollContainer>
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