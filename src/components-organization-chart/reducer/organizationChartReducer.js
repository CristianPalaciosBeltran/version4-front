import {
    ORGANIZATION_CHART_CARGANDO,
    ORGANIZATION_CHART_ERROR,
    ORGANIZATION_CHART_HANDLE_CHANGE,
    ORGANIZATION_CHART_CLEAN_STATE,
    ORGANIZATION_CHART_CRUD,
    ORGANIZATION_CHARTS_LIST,
    ORGANIZATION_CHART_HANDLE_VALIDATION,
    ORGANIZATION_CHART_CHILD
  } from "./organizationChartTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      PositionId:0,
      CompanyId: 0,
      PersonDetailId:0,
      AreasId: 0,
      PositionChartId: 0,
      OrganizationChart1: [],
      Position: {},
      PersonalDetail: {},
      Area: {}
    },
    child: {
        Id: 0,
        DateCreated:'',
        DateModified:'',
        PositionId:0,
        CompanyId: 0,
        PersonDetailId:0,
        AreasId: 0,
        PositionChartId: 0,
        OrganizationChart1: []
      },
    validations: {
      PositionId: "",
      PersonDetailId:'',
      AreasId:'',
    },
    list_organization_chart: [],
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
            DateCreated:'',
            DateModified:'',
            PositionId:0,
            CompanyId: 0,
            PersonDetailId:0,
            AreasId: 0,
            PositionChartId: 0,
            OrganizationChart1: [],
            Position:{},
            PersonalDetail:{},
            Area: {}

          },
          child: {
            Id: 0,
            DateCreated:'',
            DateModified:'',
            PositionId:0,
            CompanyId: 0,
            PersonDetailId:0,
            AreasId: 0,
            PositionChartId: 0,
            OrganizationChart1: [],
            Position:{},
            PersonalDetail:{},
            Area: {}

          },
          validations: {
            PositionId: "",
            PersonDetailId:'',
            AreasId:'',
          },
          list_organization_chart: [],
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
            DateModified: action.payload.DateModified,
            PositionId:action.payload.PositionId,
            CompanyId: action.payload.CompanyId,
            PersonDetailId:action.payload.PersonDetailId,
            AreasId: action.payload.AreasId,
            PositionChartId: action.payload.PositionChartId,
            OrganizationChart1: action.payload.OrganizationChart1,
            Position: action.payload.Position,
            PersonalDetail: action.payload.PersonalDetail,
            Area: {}

          },
          validations: {
            PositionId: "",
            PersonDetailId:'',
            AreasId:'',
          },
          list_organization_chart: [],
        };

        case ORGANIZATION_CHART_CHILD:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          child: {
            Id: action.payload.Id,
            DateCreated: action.payload.DateCreated,
            DateModified: action.payload.DateModified,
            PositionId:action.payload.PositionId,
            CompanyId: action.payload.CompanyId,
            PersonDetailId:action.payload.PersonDetailId,
            AreasId: action.payload.AreasId,
            PositionChartId: action.payload.PositionChartId,
            OrganizationChart1: action.payload.OrganizationChart1,
            Position: action.payload.Position,
            Area: action.payload.Area
          },
          validations: {
            PositionId: "",
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