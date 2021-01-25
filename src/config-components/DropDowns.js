// Imports de react.
import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import {Arrays} from '../utils'

export const DropDownActions = ({children, labelButton, color='link'}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret color={color} className="text-dark">{labelButton}</DropdownToggle>
      <DropdownMenu>{children}</DropdownMenu>
    </Dropdown>
  );
};

export const Items = ({items, action}) => {
  let fixDropDown = Arrays.fixSelect('Id','TradeName', items);
  return(
    <>
      {
        fixDropDown.map(area => {
            
            return <DropdownItem key={area.Id} onClick={() => action(area.Id)}>{area.Name}</DropdownItem>
        })
      }
    </>
  )
}
