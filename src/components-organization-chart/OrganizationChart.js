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
import {connect} from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'

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


export const CardNode = ({positionId,name, description, addChild, updateNode,deleteChild}) => {
    return(
        
        <Card>
          <CardBody>
          <CardSubtitle className='text-muted' >
            {name}
          </CardSubtitle>
          {/* <CardTitle className='text-dark'>
            {description}
          </CardTitle> */}
          <Modals positionId={positionId} modalTitle={name} name={name} description={description}>
            <FaIcons.FaEye className="mr-2 text-primary" />
          </Modals>
          <FaIcons.FaPlusCircle className="mr-2 text-success" onClick={addChild}/>
          <FaIcons.FaEdit className="mr-2 text-secondary" onClick={updateNode}/>
          {deleteChild && <FaIcons.FaMinusCircle className='text-danger' onClick={deleteChild}/>}
          
          </CardBody>
        </Card>
    )
  }

 
class OrganizationChart extends React.Component {

    state = {
        tree: ''
    }
    async componentDidMount() {
        const {organizationChartMethods, companyId} = this.props;
        await organizationChartMethods({companyId},'GetOrganizationChartByCompanyId');
      
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
                        description={organigrama?.Position?.Description}
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

    render () {

        const { organizationChartReducer:{data: {Id}}, companyId } = this.props

        return(
            <div>
                <ul className="list-inline mb-4">
                <li className="list-inline-item"><small><Link to={`/admin-dashboard/company/${companyId}`} className="text-muted">mis indicadores</Link> <FaIcons.FaChevronRight className="ml-1" /></small></li>
                <li className="list-inline-item "><small className="font-weight-bold">Organigrama</small></li>
            </ul>
                {
                    Id 
                        ? <Tree
                            lineWidth={'2px'}
                            lineColor={'gray'}
                            lineBorderRadius={'10px'}
                            label={<StyledNode>
                            <CardNode name={Id} position={'Accionista'} addChild={() => this.addChild(Id)} />
                            </StyledNode>}
                        >
                            {
                                // this.state.tree
                                this.createOrganigrama(this.props.organizationChartReducer.data)
                            }
                        </Tree>
                        : <FaIcons.FaPlusCircle className="" onClick={this.createOrigin}/>
                }
                
                
            </div>
        )
    }
}
const mapStateToProps = ({organizationChartReducer}) => {
    return {organizationChartReducer}
}

const mapDispatchToProps = {
    ...organizationChartActions,
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationChart);