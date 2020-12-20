import {
    ANALYTICS_CARGANDO,
    ANALYTICS_ERROR,
    ANALYTICS_CLEAN_STATE,
    ANALYTICS_COUNT_PRODUCTS,
    ANALYTICS_COUNT_COURSES,
    ANALYTICS_COUNT_USERS,
    ANALYTICS_COUNT_ADMINS,
    ANALYTICS_COUNT_COMPANIES
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
    count_companies: 0
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
        debugger
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          count_companies: action.payload,
        };
      default:
        return { ...state };
    }
  };

  export default reducer;
  