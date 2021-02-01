import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  DropdownItem } from "reactstrap";
import { DropDowns } from '../config-components'
import * as areaActions from "./reducer/areaActions";

export const ChooseArea = ({getChartByArea}) => {
  const dispatch = useDispatch();
  const areaReducer = useSelector((state) => state.areaReducer);
  const { companyId } = useParams();
  useEffect(() => {
    dispatch(
      areaActions.areaMethods(
        { companyId: companyId },
        "GetAreasByCompanyIdTaken"
      )
    );
  }, [dispatch, companyId]);
  const { list_areas } = areaReducer;

  let [area, setArea] = useState('General');
  const choose = (chosenArea) => {
      if(chosenArea.Name){
        setArea(chosenArea.Name)
      } else {
        setArea('General')
      }
      getChartByArea(chosenArea)
  }

  return (
    <DropDowns.DropDownActions labelButton={area}>
      <DropdownItem onClick={() => choose("general")}>
        General
      </DropdownItem>
      {list_areas.map((area) => {
        return (
          <DropdownItem
            onClick={() => choose(area)}
          >
            {area.Name}
          </DropdownItem>
        );
      })}
    </DropDowns.DropDownActions>
  );
};
