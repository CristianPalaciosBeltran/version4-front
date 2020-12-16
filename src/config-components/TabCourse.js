import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';

const TabCourse = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Descripción General
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Sporte
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="py-4">
        <TabPane tabId="1">
            <Container>
                <h5>Acerca de este curso</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra enim vitae neque ultrices, non fringilla leo porta. Praesent dui elit, imperdiet id risus in, cursus lacinia ligula. </p>
            </Container>
        </TabPane>
        <TabPane tabId="2">  
            <Container>
                <h5>Soporte y ayuda</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra enim vitae neque ultrices, non fringilla leo porta. Praesent dui elit, imperdiet id risus in, cursus lacinia ligula. </p>
            </Container>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default TabCourse;