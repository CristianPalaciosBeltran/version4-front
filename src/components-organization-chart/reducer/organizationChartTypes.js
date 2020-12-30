import { axios_api } from "../../components-api/ConfigApi";

export const ORGANIZATION_CHART_CARGANDO = "organization_chart_cargando";
export const ORGANIZATION_CHART_ERROR = "organization_chart_error";
export const ORGANIZATION_CHART_HANDLE_CHANGE = "organization_chart_handle_change";
export const ORGANIZATION_CHART_CLEAN_STATE = "organization_chart_clean_state";
export const ORGANIZATION_CHART_CRUD = "organization_chart_crud";
export const ORGANIZATION_CHARTS_LIST = "organization_charts_list";
export const ORGANIZATION_CHART_HANDLE_VALIDATION = "organization_chart_handle_validation";
export const ORGANIZATION_CHART_CHILD = 'organization_chart_child'

export const GetOrganizationCharts = async()=> {
    const  answer = await axios_api(
        `api/OrganizationCharts`,
        true,
        "get"
      );
    return {res:answer, type: ORGANIZATION_CHARTS_LIST};
}

export const GetOrganizationChart = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChart?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: ORGANIZATION_CHART_CRUD};
}

export const GetOrganizationChartChild = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChart?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: ORGANIZATION_CHART_CHILD};
}

export const GetOrganizationChartByCompanyId = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChartByCompanyId?companyId=${data.companyId}`,
        true,
        "get"
      );
    return {res:answer, type: ORGANIZATION_CHART_CRUD};
}

export const GetOrganizationChartByArea = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChartByArea?companyId=${data.companyId}&areaId=${data.areaId}`,
        true,
        "get"
      );
    return {res:answer, type: ORGANIZATION_CHART_CRUD};
}

export const PutOrganizationChart = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChart?id=${data.Id}`,
        true,
        "put",
        data
      );
    return {res:answer, type: 'organization_chart_put'};
}

export const PostOrganizationChart = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChart`,
        true,
        "post",
        data
      );
    return {res:answer, type: ORGANIZATION_CHART_CRUD};
}

export const DeleteOrganizationChart = async(data)=> {
    const  answer = await axios_api(
        `api/OrganizationChart?id=${data.Id}`,
        true,
        "delete"
      );
    return {res:answer, type: ORGANIZATION_CHART_CRUD};
}