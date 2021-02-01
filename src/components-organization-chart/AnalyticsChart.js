import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { CardAnalytics } from "../config-components/Cards";
import * as FaIcons from "react-icons/fa";
import * as organizationChartActions from "./reducer/organizationChartActions";

const AnalyticsChart = ({ areaId = '' }) => {
  const dispatch = useDispatch();
  const organizationChartReducer = useSelector(
    (state) => state.organizationChartReducer
  );
  const { companyId } = useParams();
  const { analytics_organization_chart } = organizationChartReducer;
  useEffect(() => {
    dispatch(
      organizationChartActions.organizationChartMethods(
        { companyId: companyId },
        "GetOrganizationChartAnalytics"
      )
    );
  }, [dispatch, companyId]);

  let typeChart = [];
  
  if (areaId && analytics_organization_chart.length > 0) {
    let fatherPosition = analytics_organization_chart.filter(child => child.AreasId === Number(areaId));
    if(fatherPosition.length > 0) typeChart = organizationChartActions.treeArray(fatherPosition[0], analytics_organization_chart);
    
  } else {
    typeChart = analytics_organization_chart;
  }
  const sumMonthlySalary = (accumalator, currentvalue) => {
    return accumalator + currentvalue.MonthlySalary;
  };
  const totalMonthtlySalary = typeChart.reduce(
    sumMonthlySalary,
    0
  );
  const sumBenefitsSalary = (accumalator, currentvalue) => {
    return accumalator + currentvalue.BenefitsSalary;
  };
  const sumTotalSalary = (accumalator, currentvalue) => {
    return accumalator + currentvalue.TotalSalary;
  };

  const cardAnalytics = [
    {
      id: "1-a",
      title: "Posiciones",
      number: typeChart.length,
      icon: <FaIcons.FaUserFriends className="mr-2" />,
    },
    {
      id: "2-a",
      title: "Hombres",
      number: typeChart.filter((item) => item.Gender === "M")
        .length,
      icon: <FaIcons.FaUserFriends className="mr-2" />,
    },
    {
      id: "3-a",
      title: "Mujeres",
      number: typeChart.filter((item) => item.Gender === "F")
        .length,
      icon: <FaIcons.FaUserFriends className="mr-2" />,
    },
    {
      id: "4-a",
      title: "Mensual",
      number: totalMonthtlySalary
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
      icon: <FaIcons.FaMoneyBill className="mr-2" />,
    },
    {
      id: "5-a",
      title: "Prestaciones",
      number: typeChart
        .reduce(sumBenefitsSalary, 0)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
      icon: <FaIcons.FaMoneyBill className="mr-2" />,
    },
    {
      id: "5-a",
      title: "Gasto",
      number: typeChart
        .reduce(sumTotalSalary, 0)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
      icon: <FaIcons.FaMoneyBill className="mr-2" />,
    },
  ];

  console.log(typeChart);
  return (
    <>
      {cardAnalytics.map((data) => {
        return (
          <Col lg="3" key={data.id}>
            <CardAnalytics
              icon={data.icon}
              title={data.title}
              number={data.number}
            />
          </Col>
        );
      })}
    </>
  );
};

export default AnalyticsChart;
