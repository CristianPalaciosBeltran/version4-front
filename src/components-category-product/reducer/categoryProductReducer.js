import {
    CATEGORY_PRODUCT_CARGANDO,
    CATEGORY_PRODUCT_ERROR,
    CATEGORY_PRODUCT_HANDLE_CHANGE,
    CATEGORY_PRODUCT_CLEAN_STATE,
    CATEGORY_PRODUCT_CRUD,
    CATEGORIES_PRODUCTS_LIST,
    CATEGORY_PRODUCT_HANDLE_VALIDATION
  } from "./categoryProductTypes";
  
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
    list_categories_products: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CATEGORY_PRODUCT_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case CATEGORY_PRODUCT_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case CATEGORY_PRODUCT_HANDLE_CHANGE:
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
      case CATEGORY_PRODUCT_HANDLE_VALIDATION:
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case CATEGORY_PRODUCT_CLEAN_STATE:
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
          list_categories_products: [],
        };
      case CATEGORY_PRODUCT_CRUD:
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
  
      case CATEGORIES_PRODUCTS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_categories_products: action.payload,
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
  