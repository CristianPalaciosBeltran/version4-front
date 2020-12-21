import React, {useState} from 'react'
import styled from 'styled-components'
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card,  CardBody, CardTitle, CardSubtitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap'

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
`;

export const Modals = ({children, modalTitle, name}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
      <div>
        <div role="button" onClick={toggle}>{children}</div>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <h3>{name}</h3>
            Descripción del puestoLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggle}>Quitar puesto</Button>{' '}
            <Button color="primary" onClick={toggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

export const CardNode = ({name, position}) => {
    return(<Modals modalTitle={position} name={name}>
        <Card>
          <CardBody>
          <CardSubtitle className='text-muted' >
            {name}
          </CardSubtitle>
          <CardTitle className='text-dark'>
            {position}
          </CardTitle>
          </CardBody>
        </Card>
      </Modals>
    )
  }

 
class OrganizationChart extends React.Component {


    createOrganigrama = (organigrama) => {

        let children = organigrama?.children
        if(children?.length === 0 || children === undefined || !children){
            
            return <TreeNode 
                label={
                <StyledNode>
                    <CardNode name={organigrama?.name} position={organigrama?.puesto}/>
                </StyledNode>
                }
            />
        }
        
        return <TreeNode 
            label={
                <StyledNode>
                    <CardNode name={organigrama?.name} position={organigrama?.puesto}/>
                </StyledNode>
            }
        >
            {
                children.map(child => {
                    return this.createOrganigrama(child)
                })
            }
        </TreeNode>
    }

    render () {
        const organigrama = {
            id: 1,
            name: 'Miguel Roque',
            puesto: 'Director',
            children: [
                {
                    id: 2,
                    name: 'John Nielsen',
                    puesto: 'Gerente de Sistemas',
                    children:[
                        {
                            id: 4,
                            name: 'Emilio Lopez',
                            puesto: 'Programador',
                        },
                        {
                            id: 5,
                            name: 'Eddy Cortez',
                            puesto: 'Diseñador',
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Juan Lopez',
                    puesto: 'Gerente de contabilidad',
                    children:[
                        {
                            id:7,
                            name: 'Gonzalo Ruiz',
                            puesto: 'Contador',
                            children:[
                                {
                                    id:9,
                                    name: 'Jorge Hernandez',
                                    puesto: 'Contador Jr',
                                },
                                {
                                    id:10,
                                    name: 'Aurelio Romano',
                                    puesto: 'Contador Jr',
                                }
                            ]
                        },
                        {
                            id:8,
                            name: 'Edgar Vival',
                            puesto: 'Contador',
                        }
                    ]
                },
                {
                    id:11,
                    name: 'Jesús Gomez',
                    puesto: 'Mentor',
                }
            ]
          }
        
        return(
            <div>
                
                <Tree
                    lineWidth={'2px'}
                    lineColor={'gray'}
                    lineBorderRadius={'10px'}
                    label={<StyledNode>
                    <CardNode name={'Miguel Roque	'} position={'Accionista'}/>
                    </StyledNode>}
                >
                    {
                        this.createOrganigrama(organigrama)
                    }
                </Tree>
            </div>
        )
    }
}

export default OrganizationChart;