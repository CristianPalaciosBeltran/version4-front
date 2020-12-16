import {
    COURSE_CARGANDO,
    COURSE_ERROR,
    COURSE_HANDLE_CHANGE,
    COURSE_CLEAN_STATE,
    COURSE_CRUD,
    COURSES_LIST,
    COURSE_HANDLE_VALIDATION
  } from "./courseTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      UserId:'',
      Name: "",
      Description:'',
    },
    validations: {
      Name: "",
      Description:'',
    },
    list_courses: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case COURSE_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case COURSE_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case COURSE_HANDLE_CHANGE:
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
      case COURSE_HANDLE_VALIDATION:
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case COURSE_CLEAN_STATE:
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
            UserId:'',
            Name: "",
            Description:'',
          },
          validations: {
            Name: "",
            Description:'',
          },
          list_courses: [],
        };
      case COURSE_CRUD:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: action.payload.Id,
            DateCreated:action.payload.DateCreated,
            DateModified:action.payload.DateModified,
            UserId:action.payload.UserId,
            Name: action.payload.Name,
            Description:action.payload.Description,
          },
          validations: {
            Name: true,
            Description:true,
          },
          list_brands: [],
        };
  
      case COURSES_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_courses: action.payload,
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
  