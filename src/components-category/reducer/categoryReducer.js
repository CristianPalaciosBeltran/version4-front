import {
    CATEGORY_CARGANDO,
    CATEGORY_ERROR,
    CATEGORY_HANDLE_CHANGE,
    CATEGORY_CLEAN_STATE,
    CATEGORY_CRUD,
    CATEGORIES_LIST,
    CATEGORY_HANDLE_VALIDATION
  } from "./categoryTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      Name: "",
    },
    validations: {
      Name: "",
    },
    list_categories: [],
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CATEGORY_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case CATEGORY_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case CATEGORY_HANDLE_CHANGE:
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.e.name]: action.payload.e.value,
          },
          validations: {
            ...state.validations,
            [action.payload.e.name]: action.payload.isInvalid,
          },
        };
      case CATEGORY_HANDLE_VALIDATION: 
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case CATEGORY_CLEAN_STATE:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: 0,
            Name: "",
          },
          validations: {
            Name: "",
          },
          list_categories: [],
        };
      case CATEGORY_CRUD:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: action.payload.Id,
            Name: action.payload.Name,
          },
          validations: {
            Name: "",
          },
          list_brands: [],
        };
  
      case CATEGORIES_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_categories: action.payload,
        };
  
      case "put":
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

  export default reducer;
  