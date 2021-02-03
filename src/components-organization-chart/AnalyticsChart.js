import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { CardAnalytics, MiniCardAnalytics } from "../config-components/Cards";
import * as FaIcons from "react-icons/fa";
import * as organizationChartActions from "./reducer/organizationChartActions";
import { TableFilter } from "../config-components/Filter";

const AnalyticsChart = ({ areaId = "" }) => {
  const dispatch = useDispatch();
  const organizationChartReducer = useSelector(
    (state) => state.organizationChartReducer
  );
  const { companyId } = useParams();
  const {
    analytics_organization_chart,
    api_actions: { cargando, error },
  } = organizationChartReducer;
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
    let fatherPosition = analytics_organization_chart.filter(
      (child) => child.AreasId === Number(areaId)
    );
    if (fatherPosition.length > 0)
      typeChart = organizationChartActions.treeArray(
        fatherPosition[0],
        analytics_organization_chart
      );
  } else {
    typeChart = analytics_organization_chart;
  }
  const sumMonthlySalary = (accumalator, currentvalue) => {
    return accumalator + currentvalue.MonthlySalary;
  };
  const totalMonthtlySalary = typeChart.reduce(sumMonthlySalary, 0);
  const sumBenefitsSalary = (accumalator, currentvalue) => {
    return accumalator + currentvalue.BenefitsSalary;
  };
  const sumTotalSalary = (accumalator, currentvalue) => {
    return accumalator + currentvalue.TotalSalary;
  };
  const totalSalary = analytics_organization_chart.reduce(sumTotalSalary, 0);
  const totalSalaryArea = typeChart.reduce(sumTotalSalary, 0);

  organizationChartReducer.total_salary = totalSalary;
  if (areaId) {
    organizationChartReducer.total_salary_area = totalSalaryArea;
  }
  const cardAnalytics = [
    {
      id: "1-a",
      title: "Colaboradores",
      number: typeChart.length,
      icon: <FaIcons.FaUserFriends className="mr-2" />,
    },
    // {
    //   id: "2-a",
    //   title: "Hombres",
    //   number: typeChart.filter((item) => item.Gender === "M").length,
    //   icon: <FaIcons.FaUserFriends className="mr-2" />,
    // },
    // {
    //   id: "3-a",
    //   title: "Mujeres",
    //   number: typeChart.filter((item) => item.Gender === "F").length,
    //   icon: <FaIcons.FaUserFriends className="mr-2" />,
    // },
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
      title: "Integrado",
      number: typeChart
        .reduce(sumBenefitsSalary, 0)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
      icon: <FaIcons.FaMoneyBill className="mr-2" />,
    },
  ];

  const getUser = () => {};

  let typeChartWithPercentage = typeChart.map((item) => {
    item.PercentageCompany = ((item.TotalSalary * 100) / totalSalary).toFixed(1);
    if (areaId) {
      item.PercentageArea = ((item.TotalSalary * 100) / totalSalaryArea).toFixed(1);
    }
    return item;
  });

  return (
    <>
      {cardAnalytics.map((data) => {
        return (
          <Col lg="3" key={data.id}>
            <MiniCardAnalytics
              icon={data.icon}
              title={data.title}
              number={data.number}
            />
          </Col>
        );
      })}
      {areaId ? (
        <Col lg="3">
          <MiniCardAnalytics
            icon={<FaIcons.FaMoneyBill className="mr-2" />}
            title={"Area"}
            number={totalSalaryArea
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
            percentage={((totalSalaryArea * 100) / totalSalary).toFixed(2)}
          />
        </Col>
      ) : (
        ""
      )}
      <Col lg="3">
        <MiniCardAnalytics
          icon={<FaIcons.FaMoneyBill className="mr-2" />}
          title={"Total"}
          number={totalSalary
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
        />
      </Col>

      <Col lg="12" className="mt-4">
        <TableFilter
          title={"Colaboradores"}
          titlesTable={[
            "Posición",
            "Nombre",
            "Mensual",
            "Prestaciones",
            "Total",
            "% A",
            "% E",
            "Acciones",
          ]}
          propertiesTable={[
            "PositionName",
            "PersonName",
            "MonthlySalary",
            "BenefitsSalary",
            "TotalSalary",
            "PercentageArea",
            "PercentageCompany",
          ]}
          hrefCreate={`/admin-dashboard/company/${companyId}/indicators`}
          bodyTable={typeChartWithPercentage}
          loading={cargando}
          error={error}
          actions={[{ action: "Ver Empleado", handleAction: getUser }]}
        />
      </Col>
    </>
  );
};

export default AnalyticsChart;
