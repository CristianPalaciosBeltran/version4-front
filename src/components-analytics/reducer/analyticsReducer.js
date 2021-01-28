import {
    ANALYTICS_CARGANDO,
    ANALYTICS_ERROR,
    ANALYTICS_CLEAN_STATE,
    ANALYTICS_COUNT_PRODUCTS,
    ANALYTICS_COUNT_COURSES,
    ANALYTICS_COUNT_USERS,
    ANALYTICS_COUNT_ADMINS,
    ANALYTICS_COUNT_COMPANIES,
    ANALYTICS_COUNT_POSITIONS,
    ANALYTICS_COUNT_PERSONAL_DETAILS,
    ANALYTICS_COUNT_AREAS,
    ANALYTICS_COMPANY
  } from "./analyticsTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    count_products: 0,
    count_courses: 0,
    count_users: 0,
    count_admins: 0,
    count_companies: 0,
    count_positions: 0,
    count_personal_details: 0,
    count_areas: 0,
    analytics_company: {},
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ANALYTICS_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case ANALYTICS_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
  
      case ANALYTICS_CLEAN_STATE:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_products: 0,
        };
  
      case ANALYTICS_COUNT_PRODUCTS:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_products: action.payload,
        };

      case ANALYTICS_COUNT_COURSES:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_courses: action.payload,
        };

      case ANALYTICS_COUNT_USERS:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_users: action.payload,
        };

      case ANALYTICS_COUNT_ADMINS:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_admins: action.payload,
        };
      case ANALYTICS_COUNT_COMPANIES:
      
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_companies: action.payload,
        };
      case ANALYTICS_COUNT_POSITIONS:
      
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_positions: action.payload,
        };
      case ANALYTICS_COUNT_PERSONAL_DETAILS:
      
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_personal_details: action.payload,
        };
      case ANALYTICS_COUNT_AREAS:
      
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_areas: action.payload,
        };
      case ANALYTICS_COMPANY:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          analytics_company: action.payload,
        };
      default:
        return { ...state };
    }
  };

  export default reducer;
  