// Imports de react.
import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

export const DropDownActions = ({children, labelButton}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret color={'link'} className="text-dark">{labelButton}</DropdownToggle>
      <DropdownMenu>{children}</DropdownMenu>
    </Dropdown>
  );
};
