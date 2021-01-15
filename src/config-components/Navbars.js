// Imports de react.
import React, { useState } from 'react';
import {useParams} from 'react-router-dom'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu
} from 'reactstrap';

import {Logo} from './Logos'
// Imports de components-api.
import {signOff} from '../components-api/ConfigApi'
// FontAwesome Icons
import * as FaIcons from "react-icons/fa"

export const Navbars = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
      <Navbar expand="md" className="fixed-top bg-white border-bottom">
        <Container>
        {/* <NavbarBrand href="/" className="text className='text-primary'-dark font-weight-bold">VERSION 4</NavbarBrand> */}
        <Logo />
        <NavbarToggler onClick={toggle}><FaIcons.FaBars className="lead" /></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-flex mr-2">
              <NavLink href="/login"className="btn btn-outline-secondary align-self-center">Empresas</NavLink>
            </NavItem>
            {/* <NavItem className="d-flex">
              <NavLink href="/sign-up"className="btn btn-primary align-self-center">Regístrate</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
  );
}

export const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
      <Navbar light className="bg-white" expand="md">
        <Container>
        <NavbarBrand href="/admin-dashboard" className='text-primary'>VERSION 4</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mr-3">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-dark">
                {localStorage.getItem('username')}
              </DropdownToggle>
              <DropdownMenu right className="border-0 shadow-sm">
                <DropdownItem onClick={signOff} className="text-dark">
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
  );
}

export const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {companyId} = useParams();
  return (
      <Navbar color="light" light expand="md">
        <Container>
        <NavbarBrand className='text-primary' href={`/user-dashboard/company/${companyId}`}>VERSION 4</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mr-3">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {localStorage.getItem('username')}
              </DropdownToggle>
              <DropdownMenu right className="border-0 shadow-sm">
                <DropdownItem onClick={signOff}>
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
  );
}