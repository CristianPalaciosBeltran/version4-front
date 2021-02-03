import React from "react";
import { Link } from "react-router-dom";

import { DropdownItem } from "reactstrap";

import { ApiResponses } from "../components-api";
import { connect } from "react-redux";
import * as organizationChartActions from "./reducer/organizationChartActions";
import * as areaActions from "../components-area/reducer/areaActions";
import * as FaIcons from "react-icons/fa";

import { Collapse, DropDowns } from "../config-components";
import "./style.css";
import { ChooseArea } from "../components-area";
import AnalyticsChart from "./AnalyticsChart";

class OrganizationChart extends React.Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
    this.state = {
      value: "Editar",
      areaId: ''
    };
  }

  async componentDidMount() {
    const { organizationChartMethods, companyId } = this.props;
    await organizationChartMethods(
      { companyId },
      "GetOrganizationChartByCompanyId"
    );

    companyId &&
      (await organizationChartMethods(
        { companyId: companyId },
        "GetOrganizationChartAnalytics"
      ));
  }

  centerDiagram = () => {
    const element = this.container.current;
    if (element) {
      //element.scrollTop = (element.scrollHeight - element.clientWidth) / 2;
      element.scrollLeft = (element.scrollWidth - element.clientHeight) / 2;
    }
  };

  createOrganigrama = (organigrama, isOpenAux = false, mode) => {
    let ChartTree1 = organigrama?.ChartTree1;
    if (ChartTree1?.length === 0 || ChartTree1 === undefined || !ChartTree1) {
      return (
        <div>
          <Collapse.Node
            positionChartId={organigrama.Id}
            positionId={organigrama.PositionId}
            labelButton={organigrama.PositionName}
            employee={organigrama.PersonName}
            area={organigrama.Area}
            addChild={() => this.addChild(organigrama?.Id)}
            deleteChild={() => this.deleteChild(organigrama?.Id)}
            updateNode={() => this.updateNode(organigrama?.Id)}
            watchChild={() => this.watchChild(organigrama.PositionChartId)}
            isOpenAux={isOpenAux}
            mode={mode}
            totalSalary={this.props.organizationChartReducer.total_salary}
          />
        </div>
      );
    }

    return (
      <Collapse.Node
        totalSalaryUser={organigrama.TotalSalary}
        positionChartId={organigrama.Id}
        positionId={organigrama.PositionId}
        labelButton={organigrama.PositionName}
        employee={organigrama.PersonName}
        area={organigrama.Area}
        addChild={() => this.addChild(organigrama?.Id)}
        updateNode={() => this.updateNode(organigrama?.Id)}
        watchChild={() => this.watchChild(organigrama.PositionChartId)}
        isFirst={organigrama.PositionChartId}
        isOpenAux={isOpenAux}
        mode={mode}
        totalSalary={this.props.organizationChartReducer.total_salary}
        totalSalaryArea={this.props.organizationChartReducer.total_salary_area}
      >
        {ChartTree1.map((child) => {
          return <>{this.createOrganigrama(child, false, mode)}</>;
        })}
      </Collapse.Node>
    );
  };

  createOrigin = async () => {
    const { organizationChartMethods, companyId } = this.props;
    await organizationChartMethods(
      { CompanyId: companyId },
      "PostOrganizationChart"
    );
    await organizationChartMethods(
      { companyId },
      "GetOrganizationChartByCompanyId"
    );
  };

  addUpChild = async (parentId) => {
    debugger;
    const { organizationChartMethods, companyId } = this.props;
    await organizationChartMethods(
      { CompanyId: companyId, PositionChartId: parentId },
      "PostOrganizationChart"
    );
    await organizationChartMethods(
      { companyId },
      "GetOrganizationChartByCompanyId"
    );
  };

  addChild = async (parentId) => {
    debugger;
    const { organizationChartMethods, companyId } = this.props;
    await organizationChartMethods(
      { CompanyId: companyId, PositionChartId: parentId },
      "PostOrganizationChart"
    );
    await organizationChartMethods(
      { companyId },
      "GetOrganizationChartByCompanyId"
    );
  };

  deleteChild = async (parentId) => {
    debugger;
    const { organizationChartMethods, companyId } = this.props;
    await organizationChartMethods({ Id: parentId }, "DeleteOrganizationChart");
    await organizationChartMethods(
      { companyId },
      "GetOrganizationChartByCompanyId"
    );
  };

  updateNode = (nodeId) => {
    const { history, companyId } = this.props;
    history.push(
      `/admin-dashboard/company/${companyId}/organization-chart/node/${nodeId}`
    );
  };

  getChartByArea = async (area) => {
    const { companyId, organizationChartMethods } = this.props;
    !area.Id
      ? await organizationChartMethods(
          { companyId },
          "GetOrganizationChartByCompanyId"
        )
      : await organizationChartMethods(
          { companyId, areaId: area.Id },
          "GetOrganizationChartByArea"
        );
    
    this.setState({ areaId: area.Id });
  };

  watchChild = async (positionChartId) => {
    const { companyId, organizationChartMethods } = this.props;
    await organizationChartMethods(
      { companyId, positionChartId },
      "GetOrganizationChartByFatherPosition"
    );
  };

  getCompleteOrganizationChart = async () => {
    const { organizationChartMethods, companyId } = this.props;
    await organizationChartMethods(
      { companyId },
      "GetOrganizationChartByCompanyId"
    );
  };

  EditOrganizationChart = () => {
    this.setState({ value: "Editar" });
  };

  ViewOrganizationChart = () => {
    this.setState({ value: "Vista" });
  };

  render() {
    const {
      organizationChartReducer: {
        data: { Id },
        api_actions: { cargando, error },
      },
    } = this.props;

    return (
      <div>
        <div className="m-4">
          <div className='d-flex'>
            <ChooseArea getChartByArea={this.getChartByArea} />
            <DropDowns.DropDownActions labelButton={this.state.value}>
              <DropdownItem onClick={this.EditOrganizationChart}>
                Editar
              </DropdownItem>
              <DropdownItem onClick={this.ViewOrganizationChart}>
                Vista
              </DropdownItem>
            </DropDowns.DropDownActions>
          </div>
          
        </div>
        {cargando ? (
          <ApiResponses.Loader activate={true} />
        ) : error ? (
          <ApiResponses.Error message={error} />
        ) : Id ? (
          <div className="m-4">
            
            {this.createOrganigrama(
              this.props.organizationChartReducer.data,
              true,
              this.state.value
            )}
          </div>
        ) : (
          <FaIcons.FaPlusCircle className="" onClick={this.createOrigin} />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ organizationChartReducer, areaReducer }) => {
  return { organizationChartReducer, areaReducer };
};

const mapDispatchToProps = {
  ...organizationChartActions,
  ...areaActions,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationChart);
