import {
    ORGANIZATION_CHART_CARGANDO,
    ORGANIZATION_CHART_ERROR,
    ORGANIZATION_CHART_HANDLE_CHANGE,
    ORGANIZATION_CHART_CLEAN_STATE,
    ORGANIZATION_CHART_HANDLE_VALIDATION,
    ORGANIZATION_CHART_ANALYTICS, 
    GetOrganizationCharts,
    GetOrganizationChart,
    GetPositionFromOrganization,
    GetOrganizationChartChild,
    GetOrganizationChartByCompanyId,
    GetOrganizationChartByArea,
    PutOrganizationChart,
    PostOrganizationChart,
    DeleteOrganizationChart
 } from "./organizationChartTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const organizationChartHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: ORGANIZATION_CHART_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const organizationChartHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: ORGANIZATION_CHART_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const organizationChartCleanState = () => (dispatch) => {
    dispatch({
      type: ORGANIZATION_CHART_CLEAN_STATE,
    });
  };
  
  export const organizationChartMethods = (data, method, loading = '') => async (dispatch) => {
    dispatch({
      type:!loading ? ORGANIZATION_CHART_CARGANDO : loading,
    });
    try {
      let answer;
     
      switch (method) {
        case "GetOrganizationCharts":
            answer = await GetOrganizationCharts(); 
            break;

        case "GetOrganizationChart":
            answer = await GetOrganizationChart(data);
            break;

        case "GetPositionFromOrganization":
            answer = await GetPositionFromOrganization(data);
            break;

        case "GetOrganizationChartChild":
            answer = await GetOrganizationChartChild(data);
            break;

        case "GetOrganizationChartByCompanyId":
            answer = await GetOrganizationChartByCompanyId(data);
            if(answer.res.data.length > 0){
              let padre = answer.res.data.filter(child => child.PositionChartId == null);
              let createTree = tree(padre[0], answer.res.data )
              answer.res.data = createTree
            }
            
            break;
        case "GetOrganizationChartByArea":
            //answer = await GetOrganizationChartByArea(data);
            answer = await GetOrganizationChartByCompanyId(data);

            if(answer.res.data.length > 0){
              let area = answer.res.data.filter(child => child.AreasId === Number(data.areaId));
              let createTreeByArea = tree(area[0], answer.res.data )
              answer.res.data = createTreeByArea
            }
            break;
        case "GetOrganizationChartByFatherPosition":
          answer = await GetOrganizationChartByCompanyId(data);
          if(answer.res.data.length > 0){
            let fatherPosition = answer.res.data.filter(child => child.Id === Number(data.positionChartId));
            let createTreeByFatherPosition = tree(fatherPosition[0], answer.res.data )
            answer.res.data = createTreeByFatherPosition
          }
          break;
        case "GetOrganizationChartAnalytics":
          debugger
          answer = await GetOrganizationChartByCompanyId(data);
          answer.type = ORGANIZATION_CHART_ANALYTICS
          break;

        case "PutOrganizationChart":
          answer = await PutOrganizationChart(data);
          break;

        case "PostOrganizationChart":
          answer = await PostOrganizationChart(data);
          break;
        
        case "DeleteOrganizationChart":
          answer = await DeleteOrganizationChart(data);
          break;

        default:
            break;
      }
  
      dispatch({
        type: answer.type,
        payload:  answer.res.data,
      });
    } catch (error) {
      let messageError = errorHandler(error);
      dispatch({
        type: ORGANIZATION_CHART_ERROR,
        payload: messageError,
      });
    }
  };
  

  const tree = (padre, hijos) => {
      
      let children = hijos.filter(child => child.PositionChartId === padre.Id);
      if(!children || children?.length === 0 || children === undefined ){
        return padre;
      }

      padre.ChartTree1 = children.map(child => {
        return tree(child, hijos);
      })

      return padre;
  }

  export const treeArray = (padre, hijos, concat = []) => {
    debugger
    let children = hijos.filter(child => child.PositionChartId === padre.Id);
    if(!children || children?.length === 0 || children === undefined ){
      return  concat.push(padre);;
    }
    concat.push(padre);
    //concat = concat.concat(children)
    children.map(child => {
      return treeArray(child, hijos, concat);
    })
    
    return concat;
  }