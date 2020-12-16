import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import Tab1 from '../img/tab-1.png'
import Tab2 from '../img/tab-2.png'


const Example = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs className="mb-2">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Ventas en línea
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Web Apps
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
            <Row>
                <Col lg="7" className="d-flex">
                    <div className="align-self-center">
                        <h3 className="font-weight-bold mb-3">Somos expertos en la creación de páginas web atractivas que aumentan las ventas en línea.</h3>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis tempus dui. Mauris nisl velit, vulputate eu dapibus vitae.</p>
                    </div>
                </Col>
                <Col lg="5" className="text-center">
                    <img src={Tab1} className="img-fluid" alt="Aumenta tus ventas en línea" />
                </Col>
            </Row>
        </TabPane>
        <TabPane tabId="2">
            <Row>
                <Col lg="7" className="d-flex">
                    <div className="align-self-center">
                        <h3 className="font-weight-bold mb-3">Desarrollamos tu proyecto con las mejores y más recientes tecnologias.</h3>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis tempus dui. Mauris nisl velit, vulputate eu dapibus vitae.</p>
                    </div>
                </Col>
                <Col lg="5" className="text-center">
                    <img src={Tab2} className="img-fluid" alt="Aplicaciones web modernas" />
                </Col>
            </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Example;