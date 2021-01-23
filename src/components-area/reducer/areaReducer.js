import {
    AREA_CARGANDO,
    AREA_ERROR,
    AREA_HANDLE_CHANGE,
    AREA_CLEAN_STATE,
    AREA_CRUD,
    AREAS_LIST,
    AREA_HANDLE_VALIDATION
  } from "./areaTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      Name:'',
      CompanyId:'',
      Type:'',
    },
    validations: {
      Name: "",
      Type:'',
    },
    list_areas: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AREA_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case AREA_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case AREA_HANDLE_CHANGE:
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
      case AREA_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case AREA_CLEAN_STATE:
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
            Name:'',
            CompanyId: "",
            Type:'',
           
          },
          validations: {
            Name: "",
            Type:'',
          },
          list_areas: [],
        };
      case AREA_CRUD:
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
            Name: action.payload.Name,
            CompanyId:  action.payload.CompanyId,
            Type:  action.payload.Type,
          },
          validations: {
            Name: action.payload.Name ? true : '',
            Type: action.payload.Type ? true : '',
          },
          list_areas: [],
        };
  
      case AREAS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_areas: action.payload,
        };
  
      case "area_put":
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