import {
    POSITION_CARGANDO,
    POSITION_ERROR,
    POSITION_HANDLE_CHANGE,
    POSITION_CLEAN_STATE,
    POSITION_CRUD,
    POSITIONS_LIST,
    POSITION_HANDLE_VALIDATION
  } from "./positionTypes";
  
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
      Description: "",
      CompanyId:'',
    },
    validations: {
      Name: "",
      Description:'',
    },
    list_positions: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case POSITION_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case POSITION_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case POSITION_HANDLE_CHANGE:
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
      case POSITION_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case POSITION_CLEAN_STATE:
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
            Description: "",
            CompanyId:'',
          },
          validations: {
            Name: "",
            Description:'',
          },
          list_positions: [],
        };
      case POSITION_CRUD:
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
            Description: action.payload.Description,
            CompanyId: action.payload.CompanyId,
          },
          validations: {
            Name: true,
            Description: true,
          },
          list_positions: [],
        };
  
      case POSITIONS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_positions: action.payload,
        };
  
      case "product_put":
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