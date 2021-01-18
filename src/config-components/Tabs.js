import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export const Tabs = ({children1, children2, children3, tab="1"}) => {
  const [activeTab, setActiveTab] = useState(tab);

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
            Posición
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Personal
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Laboral
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
            <Row>
                <Col lg="12" className="d-flex">
                    <div className="align-self-center">
                      {children1}
                    </div>
                </Col>
            </Row>
        </TabPane>
        <TabPane tabId="2">
            <Row>
                <Col lg="12" className="d-flex">
                    <div className="align-self-center">
                    {children2}
                    </div>
                </Col>
            </Row>
        </TabPane>
        <TabPane tabId="3">
            <Row>
                <Col lg="12" className="d-flex">
                    <div className="align-self-center">
                    {children3}
                    </div>
                </Col>
            </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}
