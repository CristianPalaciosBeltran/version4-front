import {
    ORGANIZATION_CHART_CARGANDO,
    ORGANIZATION_CHART_ERROR,
    ORGANIZATION_CHART_HANDLE_CHANGE,
    ORGANIZATION_CHART_CLEAN_STATE,
    ORGANIZATION_CHART_CRUD,
    ORGANIZATION_CHARTS_LIST,
    ORGANIZATION_CHART_HANDLE_VALIDATION,
    ORGANIZATION_CHART_CHILD,
    ORGANIZATION_CHART_ANALYTICS
  } from "./organizationChartTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated: '',
      PositionId: '',
      PersonDetailId:'',
      AreasId:'',
      Area: '',
      CompanyId:0,
      PositionChartId:0,
      PositionName:'',
      Objective:'',
      PersonName: '',
      ChartTree1:[],
    },
    validations: {
      PositionId: "",
      PersonDetailId:'',
      AreasId:'',
    },
    list_organization_chart: [],
    read_child: {},
    analytics_organization_chart: [],
    total_salary: 0,
    total_salary_area: 0
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ORGANIZATION_CHART_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case ORGANIZATION_CHART_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case ORGANIZATION_CHART_HANDLE_CHANGE:
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.e.name]: action.payload.e.files
            ? [action.payload.e.files[0]]
            : action.payload.e.value,
          },
          validations: {
            ...state.validations,
            [action.payload.e.name]: action.payload.isInvalid,
          },
        };
      case ORGANIZATION_CHART_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case ORGANIZATION_CHART_CLEAN_STATE:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: 0,
            DateCreated: '',
            PositionId: '',
            PersonDetailId:'',
            AreasId:'',
            Area:'',
            CompanyId:0,
            PositionChartId:0,
            PositionName:'',
            Objective:'',
            PersonName: '',
            ChartTree1:[],

          },
          validations: {
            PositionId: "",
            PersonDetailId:'',
            AreasId:'',
          },
          list_organization_chart: [],
          read_child: {}

        };
      case ORGANIZATION_CHART_CRUD:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: action.payload.Id, 
            DateCreated: action.payload.DateCreated,
            PositionId:  action.payload.PositionId,
            PersonDetailId: action.payload.PersonDetailId,
            AreasId: action.payload.AreasId,
            Area: action.payload.Area,
            CompanyId: action.payload.CompanyId,
            PositionChartId:action.payload.PositionChartId,
            PositionName:action.payload.PositionName,
            Objective: action.payload.Objective,
            PersonName: action.payload.PersonName,
            ChartTree1: action.payload.ChartTree1,
          },
          validations: {
            PositionId: '',
            PersonDetailId:'',
            AreasId:'',
          },
          list_organization_chart: [],
        };
      case ORGANIZATION_CHARTS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_organization_chart: action.payload,
        };
      case ORGANIZATION_CHART_CHILD:
        debugger
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          read_child: action.payload[0],
        };
      case ORGANIZATION_CHART_ANALYTICS:
        
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          analytics_organization_chart: action.payload,
        };
  
      case "organization_chart_put":
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
        };
      default:
        return { ...state };
    }
  };
  
  export default Reducer;